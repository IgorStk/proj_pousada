import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { formatarData, formatarMoeda } from "../lib/format";
import type { Reserva } from "../types";

export function ReservaConfirmada() {
  const { codigo } = useParams<{ codigo: string }>();

  const { data: reserva, isLoading } = useQuery({
    queryKey: ["reserva", codigo],
    queryFn: async () => {
      const { data } = await api.get<Reserva>(`/reservations/codigo/${codigo}`);
      return data;
    },
    enabled: !!codigo,
  });

  return (
    <>
      <Header />
      <main className="bg-areia-clara min-h-[70vh]">
        <div className="mx-auto max-w-xl px-5 md:px-8 py-16 md:py-24 text-center">
          {isLoading && <p className="text-tinta/60">Carregando...</p>}

          {reserva && (
            <>
              <span className="inline-flex w-14 h-14 rounded-full bg-marinha/20 text-marinha-escura items-center justify-center text-2xl mb-6">
                ✓
              </span>
              <h1 className="font-display text-3xl md:text-4xl text-atlantico">
                Reserva confirmada
              </h1>
              <p className="text-tinta/70 mt-2">
                Enviamos os detalhes para {reserva.hospedeEmail}
              </p>

              <div className="bg-branco rounded-xl border border-tinta/10 p-6 mt-8 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-tinta/60 text-sm">Código</span>
                  <span className="font-mono font-medium">{reserva.codigo}</span>
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

              <Link
                to="/"
                className="inline-flex mt-8 rounded-full bg-atlantico text-branco px-6 py-3 font-medium hover:bg-atlantico-escuro transition-colors"
              >
                Voltar ao início
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
