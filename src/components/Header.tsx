import { useState } from "react";
import { Link } from "react-router-dom";

const LINKS = [
  { href: "#sobre", label: "O Hotel" },
  { href: "#comodidades", label: "Comodidades" },
  { href: "#quartos", label: "Quartos" },
  { href: "#reservar", label: "Disponibilidade" },
  { href: "#localizacao", label: "Localização" },
];

export function Header() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-atlantico/95 backdrop-blur text-branco shadow-sm">
      <div className="mx-auto max-w-6xl px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-display text-lg md:text-xl tracking-tight">
          Pousada N.S. de Fátima
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="opacity-90 hover:opacity-100 hover:text-marinha-clara transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#reservar"
          className="hidden md:inline-flex items-center rounded-full bg-bugambilia px-5 py-2 text-sm font-medium hover:bg-bugambilia-escura transition-colors"
        >
          Reservar
        </a>

        <button
          className="md:hidden p-2"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-label="Abrir menu"
        >
          <span className="block w-6 h-0.5 bg-branco mb-1.5" />
          <span className="block w-6 h-0.5 bg-branco mb-1.5" />
          <span className="block w-6 h-0.5 bg-branco" />
        </button>
      </div>

      {aberto && (
        <nav className="md:hidden flex flex-col gap-1 px-5 pb-4 text-sm">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 opacity-90"
              onClick={() => setAberto(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservar"
            className="mt-2 inline-flex justify-center rounded-full bg-bugambilia px-5 py-2 font-medium"
            onClick={() => setAberto(false)}
          >
            Reservar
          </a>
        </nav>
      )}
    </header>
  );
}
