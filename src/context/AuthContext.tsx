import { mockUsers, User } from '../Services/mockUsers';

/**
 * Procura um usuário no mockUsers que coincida com e-mail e senha.
 * Retorna o objeto User se encontrado, ou null se não existir.
 */
import { mockUsers, User } from './mockUsers';

export const login = (email: string, password: string): User | null => {
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
};
export const login = (email: string, password: string): User | null => {
  // .find() percorre o array e retorna o primeiro item que satisfaz a condição
  const user = mockUsers.find(
    (u) => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
  );

  // Se o find não encontrar nada, ele retorna undefined. 
  // Forçamos o retorno de null para facilitar a verificação no frontend.
  return user || null;
};

