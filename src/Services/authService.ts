import { mockUsers, User } from './mockUsers';

export const login = (email: string, password: string): User | null => {
  // Busca exata por email (ignorando maiúsculas) e senha
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  return user || null;
};