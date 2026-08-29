import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Checkout } from "./pages/Checkout";
import { ReservaConfirmada } from "./pages/ReservaConfirmada";
import { MinhaReserva } from "./pages/MinhaReserva";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminRoomTypes } from "./pages/admin/AdminRoomTypes";
import { RequireAdmin } from "./pages/admin/RequireAdmin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservar/:tipoQuartoId" element={<Checkout />} />
      <Route path="/reserva-confirmada/:codigo" element={<ReservaConfirmada />} />
      <Route path="/minha-reserva" element={<MinhaReserva />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="quartos" element={<AdminRoomTypes />} />
        </Route>
      </Route>
    </Routes>
  );
}
