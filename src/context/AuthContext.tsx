import { createContext, useContext, useState, type ReactNode } from "react";
import { api } from "../lib/api";
import type { Admin } from "../types";

interface AuthContextValue {
  admin: Admin | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  carregando: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const salvo = localStorage.getItem("admin_info");
    return salvo ? JSON.parse(salvo) : null;
  });
  const [carregando, setCarregando] = useState(false);

  async function login(email: string, senha: string) {
    setCarregando(true);
    try {
      const { data } = await api.post("/auth/login", { email, senha });
      localStorage.setItem("admin_token", data.accessToken);
      localStorage.setItem("admin_info", JSON.stringify(data.admin));
      setAdmin(data.admin);
    } finally {
      setCarregando(false);
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_info");
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
