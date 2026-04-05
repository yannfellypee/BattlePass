import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase'; 
import { User } from '@supabase/supabase-js';

interface Perfil {
  id: string;
  nivel_acesso: number;
  nome_completo: string;
}

interface AuthContextData {
  user: User | null;
  perfil: Perfil | null;
  loading: boolean;
  isLoggingOut: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [loading, setLoading] = useState(true); // Começa travado
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fetchPerfil = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('perfis')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      setPerfil(data);
    } catch (e) {
      setPerfil(null);
    }
  };

  useEffect(() => {
    // 1. Tenta recuperar sessão salva ao abrir o app
    const checkSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        await fetchPerfil(session.user.id);
      }
      setLoading(false); // Só libera após checar o banco
    };

    checkSession();

    // 2. Escuta mudanças de estado (Login/Logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) await fetchPerfil(currentUser.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setPerfil(null);
      }
      setLoading(false);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setIsLoggingOut(true);
    await new Promise(res => setTimeout(res, 1500)); // Delay para o modal
    await supabase.auth.signOut();
    setIsLoggingOut(false);
  };

  return (
    <AuthContext.Provider value={{ user, perfil, loading, isLoggingOut, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};