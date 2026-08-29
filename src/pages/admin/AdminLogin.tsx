import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function AdminLogin() {
  const { login, carregando } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    try {
      await login(email, senha);
      navigate("/admin");
    } catch {
      setErro("E-mail ou senha inválidos.");
    }
  }

  return (
    <div className="min-h-screen bg-atlantico flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl text-branco text-center mb-1">
          Pousada N.S. das Graças
        </h1>
        <p className="text-branco/60 text-center text-sm mb-8">Painel administrativo</p>

        <form onSubmit={handleSubmit} className="bg-branco rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-tinta/15 px-3 py-2.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-lg border border-tinta/15 px-3 py-2.5"
            />
          </div>
          {erro && <p className="text-bugambilia-escura text-sm">{erro}</p>}
          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-lg bg-bugambilia text-branco font-medium py-2.5 hover:bg-bugambilia-escura transition-colors disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
