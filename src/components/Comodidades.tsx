const COMODIDADES = [
  { titulo: "Recepção 24 horas", desc: "Chegue a qualquer hora, sempre tem alguém pra te receber." },
  { titulo: "Wi-Fi gratuito", desc: "Sinal em toda a propriedade, sem custo adicional." },
  { titulo: "Estacionamento gratuito", desc: "Vaga privativa pra quem vem de carro." },
  { titulo: "Ar-condicionado", desc: "Em todos os quartos, pro calor de Fortaleza não incomodar." },
  { titulo: "Quartos para famílias", desc: "Espaço extra pra viajar com crianças." },
  { titulo: "Serviço de quarto", desc: "Conforto sem precisar sair do apê." },
  { titulo: "Acesso para pessoas com deficiência", desc: "Instalações preparadas para receber todos." },
  { titulo: "Quartos para não fumantes", desc: "Ambientes livres de fumaça em toda a pousada." },
];

export function Comodidades() {
  return (
    <section id="comodidades" className="bg-atlantico text-branco">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-20">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-marinha-clara mb-3">
          Comodidades
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-medium mb-10 max-w-lg">
          O essencial, bem resolvido
        </h2>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-branco/10 rounded-xl overflow-hidden">
          {COMODIDADES.map((item) => (
            <li key={item.titulo} className="bg-atlantico p-6">
              <h3 className="font-display text-lg mb-2">{item.titulo}</h3>
              <p className="text-sm text-branco/70">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
