import { WaveDivider } from "./WaveDivider";

export function Hero() {
  return (
    <section className="relative bg-atlantico text-branco">
      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-14 pb-24 md:pt-20 md:pb-32 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-marinha-clara mb-4">
            Fortaleza · Ceará
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] font-medium">
            A maré sobe,
            <br />
            <span className="italic text-marinha-clara">a estadia fica.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-branco/80 max-w-md">
            Pousada Nossa Senhora das Graças: acomodação simples e acolhedora,
            a poucos minutos das principais atrações de Fortaleza, com
            recepção 24 horas e Wi-Fi grátis em toda a propriedade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#reservar"
              className="inline-flex items-center rounded-full bg-bugambilia px-6 py-3 font-medium hover:bg-bugambilia-escura transition-colors"
            >
              Ver disponibilidade
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center rounded-full border border-branco/40 px-6 py-3 font-medium hover:bg-branco/10 transition-colors"
            >
              Conhecer o hotel
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 border border-marinha-clara/30 rounded-2xl -rotate-2" />
          <img
            src="/frente-pousada.jpg"
            alt="Fachada da Pousada Nossa Senhora das Graças"
            className="relative rounded-2xl w-full h-[320px] md:h-[420px] object-cover rotate-1 shadow-2xl"
          />
        </div>
      </div>

      <WaveDivider corFundo="#f8f1de" />
    </section>
  );
}
