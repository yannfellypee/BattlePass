import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase'; 
import { Session, User } from '@supabase/supabase-js';

interface AuthContextData {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isLoggingOut: boolean; // Adicionado
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Novo estado

  useEffect(() => {
    // 1. Busca a sessão inicial
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initializeAuth();

    // 2. Escuta mudanças (Login/Logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Se o evento for de SIGN_OUT, garantimos que o isLoggingOut resete
      if (_event === 'SIGNED_OUT') {
        setIsLoggingOut(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      setIsLoggingOut(true); // Ativa o Modal de "Saindo da Roda"
      
      // Dá tempo do usuário ver a rima/animação de despedida
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

    } catch (error) {
      console.error("Erro ao deslogar:", error);
    } finally {
      // Importante: Resetamos aqui para garantir que o Modal feche
      setIsLoggingOut(false);
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isLoggingOut, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};