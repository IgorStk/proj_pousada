import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function RequireAdmin() {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
