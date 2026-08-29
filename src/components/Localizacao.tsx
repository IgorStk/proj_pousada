export function Localizacao() {
  return (
    <section id="localizacao" className="bg-atlantico text-branco">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-marinha-clara mb-3">
            Localização
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
            Fortaleza, Ceará
          </h2>
          <p className="text-branco/75 leading-relaxed">
            A poucos minutos das principais atrações da cidade — Centro
            Cultural Dragão do Mar, Museu do Ceará e North Shopping — e a
            apenas 4 km do Aeroporto Internacional Pinto Martins.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-branco/20 h-72 md:h-80">
          <iframe
            title="Mapa da Pousada Nossa Senhora das Graças"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63899.6!2d-38.543!3d-3.7419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFortaleza%2C%20CE!5e0!3m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
