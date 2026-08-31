import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/api";
import type { Admin } from "../types";

interface AuthContextValue {
  admin: Admin | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  carregando: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    api
      .get<{ admin: Admin }>("/auth/session")
      .then(({ data }) => ativo && setAdmin(data.admin))
      .catch(() => ativo && setAdmin(null))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, []);

  async function login(email: string, senha: string) {
    setCarregando(true);
    try {
      const { data } = await api.post("/auth/login", { email, senha });
      setAdmin(data.admin);
    } finally {
      setCarregando(false);
    }
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      setAdmin(null);
    }
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
