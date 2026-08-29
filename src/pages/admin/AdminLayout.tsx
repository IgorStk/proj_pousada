import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2.5 rounded-lg text-sm font-medium ${
      isActive ? "bg-atlantico text-branco" : "text-tinta/70 hover:bg-tinta/5"
    }`;

  return (
    <div className="min-h-screen bg-areia-clara flex flex-col md:flex-row">
      <aside className="md:w-60 bg-branco border-b md:border-b-0 md:border-r border-tinta/10 p-4 md:p-5 flex md:flex-col justify-between">
        <div className="flex md:flex-col gap-2 md:gap-1 items-center md:items-stretch">
          <p className="font-display text-lg text-atlantico hidden md:block mb-4">
            Painel · Pousada
          </p>
          <NavLink to="/admin" end className={linkClass}>
            Reservas
          </NavLink>
          <NavLink to="/admin/quartos" className={linkClass}>
            Tipos de quarto
          </NavLink>
        </div>
        <div className="flex md:flex-col items-center md:items-stretch gap-3 md:gap-2">
          <span className="text-xs text-tinta/50 hidden md:block">{admin?.nome}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-bugambilia-escura hover:underline"
          >
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
