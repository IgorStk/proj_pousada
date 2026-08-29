import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-atlantico-escuro text-branco/70">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm">
        <div>
          <p className="font-display text-branco text-lg">Pousada Nossa Senhora das Graças</p>
          <p className="mt-1">Fortaleza, Ceará — Brasil</p>
        </div>
        <div className="flex flex-col gap-1">
          <a href="tel:+5585000000000" className="hover:text-branco transition-colors">
            (85) 0000-0000
          </a>
          <a href="mailto:contato@pousadansgracas.com.br" className="hover:text-branco transition-colors">
            contato@pousadansgracas.com.br
          </a>
          <Link to="/minha-reserva" className="hover:text-branco transition-colors mt-1">
            Consultar minha reserva
          </Link>
        </div>
      </div>
      <div className="border-t border-branco/10 py-4 text-center text-xs text-branco/40">
        © {new Date().getFullYear()} Pousada Nossa Senhora das Graças
      </div>
    </footer>
  );
}
