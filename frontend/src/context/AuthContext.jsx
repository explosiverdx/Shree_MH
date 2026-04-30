import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("hospitalUser") || "null"));

  function saveUser(data) {
    localStorage.setItem("hospitalUser", JSON.stringify(data));
    setUser(data);
  }

  async function login(payload, isAdmin = false) {
    const endpoint = isAdmin ? "/auth/admin/login" : "/auth/login";
    const { data } = await api.post(endpoint, payload);
    saveUser(data);
    return data;
  }

  async function register(payload) {
    const { data } = await api.post("/auth/register", payload);
    saveUser(data);
    return data;
  }

  function logout() {
    localStorage.removeItem("hospitalUser");
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
