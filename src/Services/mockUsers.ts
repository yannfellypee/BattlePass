export type User = {
  id: string;
  name: string;
  role: 'audience' | 'mc' | 'organizer';
  email: string;
  password: string;
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Público',
    role: 'audience',
    email: 'publico@email.com',
    password: '123456',
  },
  {
    id: '2',
    name: 'MC Kaos',
    role: 'mc',
    email: 'mc@email.com',
    password: '123456',
  },
  {
    id: '3',
    name: 'Evento Pro',
    role: 'organizer',
    email: 'org@email.com',
    password: '123456',
  },
];