const users: any[] = [];

export function register(user: any) {
  users.push(user);
  return user;
}

export function login(email: string, password: string) {
  return users.find(
    (u) => u.email === email && u.password === password
  );
}