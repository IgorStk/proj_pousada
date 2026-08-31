import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisponibilidade } from "../hooks/useRoomTypes";
import { adicionarDias, dataParaISO, formatarMoeda } from "../lib/format";
import { WaveDivider } from "./WaveDivider";

function hojeISO() {
  return dataParaISO(new Date());
}
function amanhaISO() {
  return adicionarDias(hojeISO(), 1);
}

export function BookingWidget() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(hojeISO());
  const [checkOut, setCheckOut] = useState(amanhaISO());
  const [hospedes, setHospedes] = useState(2);
  const [buscar, setBuscar] = useState<{ checkIn: string; checkOut: string; hospedes: number } | null>(
    null,
  );

  const { data, isFetching, error } = useDisponibilidade(buscar);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBuscar({ checkIn, checkOut, hospedes });
  }

  return (
    <section id="reservar" className="bg-areia-clara">
      <WaveDivider corFundo="#0b3c49" flip />
      <div className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-20 -mt-1">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-marinha-escura mb-3">
          Disponibilidade
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-medium text-atlantico mb-8">
          Quando você vem?
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-branco rounded-2xl shadow-lg p-5 md:p-6 grid sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end"
        >
          <label className="block">
            <span className="block text-xs font-mono uppercase tracking-wide text-tinta/60 mb-1.5">
              Check-in
            </span>
            <input
              type="date"
              required
              value={checkIn}
              min={hojeISO()}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-lg border border-tinta/15 px-3 py-2.5 font-mono text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-xs font-mono uppercase tracking-wide text-tinta/60 mb-1.5">
              Check-out
            </span>
            <input
              type="date"
              required
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-lg border border-tinta/15 px-3 py-2.5 font-mono text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-xs font-mono uppercase tracking-wide text-tinta/60 mb-1.5">
              Hóspedes
            </span>
            <input
              type="number"
              min={1}
              max={12}
              required
              value={hospedes}
              onChange={(e) => setHospedes(Number(e.target.value))}
              className="w-full rounded-lg border border-tinta/15 px-3 py-2.5 font-mono text-sm"
            />
          </label>

          <button
            type="submit"
            disabled={isFetching}
            className="rounded-lg bg-bugambilia text-branco px-6 py-2.5 font-medium hover:bg-bugambilia-escura transition-colors disabled:opacity-60"
          >
            {isFetching ? "Buscando..." : "Pesquisar"}
          </button>
        </form>

        {error && (
          <p className="mt-6 text-bugambilia-escura text-sm">
            Não foi possível verificar a disponibilidade. Confira as datas e tente novamente.
          </p>
        )}

        {buscar && !isFetching && data && (
          <div className="mt-8">
            {data.length === 0 ? (
              <p className="text-tinta/70">
                Nenhum quarto disponível para esse período. Tente outras datas.
              </p>
            ) : (
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((tipo) => (
                  <li
                    key={tipo.id}
                    className="bg-branco rounded-xl border border-tinta/10 p-5 flex flex-col"
                  >
                    <h3 className="font-display text-xl text-atlantico">{tipo.nome}</h3>
                    <p className="text-sm text-tinta/60 mt-1">
                      Até {tipo.capacidade} hóspedes · {tipo.unidadesLivres}{" "}
                      {tipo.unidadesLivres === 1 ? "unidade" : "unidades"} livre
                      {tipo.unidadesLivres === 1 ? "" : "s"}
                    </p>
                    <p className="text-sm text-tinta/70 mt-3 flex-1">{tipo.descricao}</p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <span className="font-mono text-xl text-atlantico">
                          {formatarMoeda(tipo.precoDiaria)}
                        </span>
                        <span className="text-xs text-tinta/50"> / diária</span>
                        <p className="text-xs text-tinta/50 font-mono mt-0.5">
                          Total: {formatarMoeda(tipo.valorTotalEstimado)} ({tipo.noites}{" "}
                          {tipo.noites === 1 ? "noite" : "noites"})
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigate(
                            `/reservar/${tipo.id}?checkIn=${checkIn}&checkOut=${checkOut}&hospedes=${hospedes}`,
                          )
                        }
                        className="rounded-full bg-atlantico text-branco text-sm px-4 py-2 hover:bg-atlantico-escuro transition-colors"
                      >
                        Reservar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
