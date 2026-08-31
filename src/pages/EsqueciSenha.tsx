import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    try {
      await api.post("/auth/forgot-password", { email });
      setEnviado(true);
    } catch {
      setErro("Não foi possível solicitar a redefinição agora. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-atlantico flex items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-branco rounded-xl p-6 space-y-4">
        <h1 className="font-display text-2xl text-atlantico">Redefinir senha</h1>
        <p className="text-sm text-tinta/60">Informe o e-mail de administrador para receber o link.</p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-tinta/15 px-3 py-2.5"
          placeholder="E-mail"
        />
        {enviado && <p className="text-sm text-marinha-escura">Se o e-mail estiver cadastrado, as instruções serão enviadas.</p>}
        {erro && <p className="text-sm text-bugambilia-escura">{erro}</p>}
        <button className="w-full rounded-lg bg-bugambilia text-branco font-medium py-2.5">
          Enviar link
        </button>
        <Link to="/admin/login" className="block text-center text-sm text-atlantico hover:underline">Voltar ao login</Link>
      </form>
    </div>
  );
}
