import { useTiposQuarto } from "../hooks/useRoomTypes";
import { formatarMoeda } from "../lib/format";

export function Quartos() {
  const { data, isLoading } = useTiposQuarto();

  return (
    <section id="quartos" className="bg-areia-clara">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-20">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-marinha-escura mb-3">
          Acomodações
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-medium text-atlantico mb-10">
          Escolha seu quarto
        </h2>

        {isLoading && <p className="text-tinta/60">Carregando quartos...</p>}

        <ul className="grid md:grid-cols-3 gap-6">
          {data?.map((tipo) => (
            <li
              key={tipo.id}
              className="bg-branco rounded-2xl overflow-hidden border border-tinta/10 flex flex-col"
            >
              <div className="h-40 bg-marinha/20 flex items-center justify-center">
                <span className="font-display text-marinha-escura/60 text-sm">
                  {tipo.nome}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-xl text-atlantico">{tipo.nome}</h3>
                <p className="text-sm text-tinta/70 mt-2 flex-1">{tipo.descricao}</p>
                <ul className="flex flex-wrap gap-1.5 mt-3">
                  {tipo.comodidades.slice(0, 3).map((c) => (
                    <li
                      key={c}
                      className="text-xs bg-areia text-atlantico rounded-full px-2.5 py-1"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-lg text-atlantico">
                  {formatarMoeda(tipo.precoDiaria)}{" "}
                  <span className="text-xs text-tinta/50 font-body">/ diária</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
