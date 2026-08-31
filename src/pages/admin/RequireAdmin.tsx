import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function RequireAdmin() {
  const { admin, carregando } = useAuth();
  if (carregando) return <p className="p-6 text-tinta/60">Verificando sessão...</p>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
