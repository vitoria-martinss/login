import { useState } from "react";
import Login from "./pages/Login";
import { getToken, getUser, logout } from "./services/authService";

export default function App() {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  function handleLoginSuccess(data) {
    setToken(data.access_token);
    setUser(data.user);
  }

  function handleLogout() {
    logout();
    setToken(null);
    setUser(null);
  }

  if (!token) return <Login onSuccess={handleLoginSuccess} />;

  return (
    <main className="home">
      <h1>Olá, {user?.name}!</h1>
      <p>Login feito. Este é o access_token recebido da API:</p>
      <div className="token-box">{token}</div>
      <button onClick={handleLogout}>Sair</button>
    </main>
  );
}
