import { users } from "../db/database";

const TOKEN_KEY = "access_token";
const USER_KEY = "user";
const EXPIRES_IN = 60 * 60; 

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createFakeJwt(user) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + EXPIRES_IN,
    })
  );
  return `${header}.${payload}.assinatura-simulada`;
}

export async function login({ email, password }) {
  await wait(800); 

  const found = users.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );

  if (!found) {
    const error = new Error("E-mail ou senha incorretos.");
    error.status = 401;
    throw error;
  }
  
  const data = {
    access_token: createFakeJwt(found),
    token_type: "Bearer",
    expires_in: EXPIRES_IN,
    user: { id: found.id, name: found.name, email: found.email },
  };

  localStorage.setItem(TOKEN_KEY, data.access_token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data;
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
