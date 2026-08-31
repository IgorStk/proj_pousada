import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";

export function RedefinirSenha() {
  const [params] = useSearchParams();
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const token = params.get("token");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (senha !== confirmacao) {
      setMensagem("As senhas não coincidem.");
      return;
    }
    try {
      await api.post("/auth/reset-password", { token, novaSenha: senha });
      setMensagem("Senha redefinida. Você já pode entrar no painel.");
    } catch {
      setMensagem("O link é inválido ou expirou. Solicite uma nova redefinição.");
    }
  }

  return (
    <div className="min-h-screen bg-atlantico flex items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-branco rounded-xl p-6 space-y-4">
        <h1 className="font-display text-2xl text-atlantico">Nova senha</h1>
        <input type="password" minLength={12} required value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Nova senha (mínimo 12 caracteres)" className="w-full rounded-lg border border-tinta/15 px-3 py-2.5" />
        <input type="password" minLength={12} required value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} placeholder="Confirme a nova senha" className="w-full rounded-lg border border-tinta/15 px-3 py-2.5" />
        {mensagem && <p className="text-sm text-tinta/70">{mensagem}</p>}
        <button disabled={!token} className="w-full rounded-lg bg-bugambilia text-branco font-medium py-2.5 disabled:opacity-60">Redefinir senha</button>
        <Link to="/admin/login" className="block text-center text-sm text-atlantico hover:underline">Ir para o login</Link>
      </form>
    </div>
  );
}
