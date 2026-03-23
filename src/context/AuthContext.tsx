import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  name: string;
  type: 'mc' | 'organizer' | 'audience';
};

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean; // Novo estado para o loading de saída
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storageUser = await AsyncStorage.getItem('@BattlePass:user');
        if (storageUser) {
          setUser(JSON.parse(storageUser));
        }
      } catch (error) {
        console.error("Erro ao recuperar sessão:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStorageData();
  }, []);

  const signIn = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem('@BattlePass:user', JSON.stringify(userData));
  };

  const signOut = async () => {
    setIsLoggingOut(true);

    // Timer de 5 segundos conforme solicitado
    setTimeout(async () => {
      try {
        await AsyncStorage.removeItem('@BattlePass:user');
        setUser(null);
      } catch (error) {
        console.error("Erro ao deslogar:", error);
      } finally {
        setIsLoggingOut(false);
      }
    }, 5000);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      isLoggingOut,
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};