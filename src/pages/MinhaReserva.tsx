import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { api } from "../lib/api";
import { formatarData, formatarMoeda } from "../lib/format";
import type { Reserva } from "../types";

export function MinhaReserva() {
  const [codigo, setCodigo] = useState("");
  const [email, setEmail] = useState("");
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function buscar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    setReserva(null);
    try {
      const { data } = await api.get<Reserva>("/reservations/consulta", {
        params: { codigo: codigo.trim(), email: email.trim() },
      });
      if (!data) throw new Error();
      setReserva(data);
    } catch {
      setErro("Não encontramos nenhuma reserva com esse código.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <Header />
      <main className="bg-areia-clara min-h-[70vh]">
        <div className="mx-auto max-w-xl px-5 md:px-8 py-16 md:py-24">
          <h1 className="font-display text-3xl md:text-4xl text-atlantico mb-2">
            Consultar minha reserva
          </h1>
          <p className="text-tinta/60 mb-8">
            Digite o código que você recebeu na confirmação (ex: PNSF-2026-AB12C)
          </p>

          <form onSubmit={buscar} className="flex gap-3">
            <div className="flex-1 space-y-3">
              <input
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="PNSF-2026-AB12C"
                className="w-full rounded-lg border border-tinta/15 px-3 py-2.5 font-mono uppercase"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail usado na reserva"
                className="w-full rounded-lg border border-tinta/15 px-3 py-2.5"
                required
              />
            </div>
            <button
              type="submit"
              disabled={carregando}
              className="rounded-lg bg-atlantico text-branco px-5 font-medium hover:bg-atlantico-escuro transition-colors disabled:opacity-60"
            >
              Buscar
            </button>
          </form>

          {erro && <p className="text-bugambilia-escura text-sm mt-4">{erro}</p>}

          {reserva && (
            <div className="bg-branco rounded-xl border border-tinta/10 p-6 mt-8 space-y-3">
              <div className="flex justify-between">
                <span className="text-tinta/60 text-sm">Status</span>
                <span className="font-medium">{reserva.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tinta/60 text-sm">Quarto</span>
                <span className="font-medium">{reserva.tipoQuarto.nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tinta/60 text-sm">Check-in</span>
                <span className="font-mono text-sm">{formatarData(reserva.checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tinta/60 text-sm">Check-out</span>
                <span className="font-mono text-sm">{formatarData(reserva.checkOut)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-tinta/10">
                <span className="text-tinta/60 text-sm">Total</span>
                <span className="font-mono font-medium text-atlantico">
                  {formatarMoeda(reserva.valorTotal)}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
