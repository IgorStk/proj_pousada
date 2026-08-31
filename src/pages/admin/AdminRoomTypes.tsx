import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { formatarMoeda } from "../../lib/format";
import type { TipoQuarto } from "../../types";

type FormState = {
  nome: string;
  slug: string;
  descricao: string;
  capacidade: number;
  precoDiaria: number;
  totalUnidades: number;
  comodidades: string; // separado por vírgula no formulário
  imagens: string[];
};

const VAZIO: FormState = {
  nome: "",
  slug: "",
  descricao: "",
  capacidade: 2,
  precoDiaria: 0,
  totalUnidades: 1,
  comodidades: "",
  imagens: [],
};

export function AdminRoomTypes() {
  const queryClient = useQueryClient();
  const [editandoId, setEditandoId] = useState<string | "novo" | null>(null);
  const [form, setForm] = useState<FormState>(VAZIO);

  const { data: tipos, isLoading } = useQuery({
    queryKey: ["admin-tipos-quarto"],
    queryFn: async () => {
      const { data } = await api.get<TipoQuarto[]>("/room-types/admin/todos");
      return data;
    },
  });

  const invalidar = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-tipos-quarto"] });

  const criar = useMutation({
    mutationFn: async (payload: any) => api.post("/room-types", payload),
    onSuccess: () => {
      invalidar();
      fecharForm();
    },
  });

  const editar = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) =>
      api.patch(`/room-types/${id}`, payload),
    onSuccess: () => {
      invalidar();
      fecharForm();
    },
  });

  const inativar = useMutation({
    mutationFn: async (id: string) => api.delete(`/room-types/${id}`),
    onSuccess: invalidar,
  });

  function abrirNovo() {
    setForm(VAZIO);
    setEditandoId("novo");
  }

  function abrirEdicao(tipo: TipoQuarto) {
    setForm({
      nome: tipo.nome,
      slug: tipo.slug,
      descricao: tipo.descricao,
      capacidade: tipo.capacidade,
      precoDiaria: Number(tipo.precoDiaria),
      totalUnidades: tipo.totalUnidades,
      comodidades: tipo.comodidades.join(", "),
      imagens: tipo.imagens,
    });
    setEditandoId(tipo.id);
  }

  function fecharForm() {
    setEditandoId(null);
    setForm(VAZIO);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const camposComuns = {
      nome: form.nome,
      descricao: form.descricao,
      capacidade: Number(form.capacidade),
      precoDiaria: Number(form.precoDiaria),
      totalUnidades: Number(form.totalUnidades),
      comodidades: form.comodidades
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      imagens: form.imagens,
    };

    if (editandoId === "novo") {
      criar.mutate({ ...camposComuns, slug: form.slug });
    } else if (editandoId) {
      editar.mutate({ id: editandoId, payload: camposComuns });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-atlantico">Tipos de quarto</h1>
        <button
          onClick={abrirNovo}
          className="rounded-lg bg-bugambilia text-branco text-sm px-4 py-2 hover:bg-bugambilia-escura transition-colors"
        >
          + Novo tipo
        </button>
      </div>

      {isLoading && <p className="text-tinta/60">Carregando...</p>}

      <div className="grid md:grid-cols-2 gap-4">
        {tipos?.map((tipo) => (
          <div
            key={tipo.id}
            className={`bg-branco rounded-xl border border-tinta/10 p-5 ${
              !tipo.ativo ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg text-atlantico">{tipo.nome}</h3>
                <p className="text-xs text-tinta/50 font-mono">/{tipo.slug}</p>
              </div>
              <span className="font-mono text-sm">{formatarMoeda(tipo.precoDiaria)}</span>
            </div>
            <p className="text-sm text-tinta/70 mt-2">{tipo.descricao}</p>
            <p className="text-xs text-tinta/50 mt-2">
              Capacidade: {tipo.capacidade} · Unidades: {tipo.totalUnidades} ·{" "}
              {tipo.ativo ? "Ativo" : "Inativo"}
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => abrirEdicao(tipo)}
                className="text-sm text-atlantico hover:underline"
              >
                Editar
              </button>
              {tipo.ativo && (
                <button
                  onClick={() => inativar.mutate(tipo.id)}
                  className="text-sm text-bugambilia-escura hover:underline"
                >
                  Inativar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editandoId && (
        <div className="fixed inset-0 bg-tinta/40 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-branco rounded-xl p-6 w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="font-display text-xl text-atlantico mb-2">
              {editandoId === "novo" ? "Novo tipo de quarto" : "Editar tipo de quarto"}
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                required
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full rounded-lg border border-tinta/15 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                disabled={editandoId !== "novo"}
                className="w-full rounded-lg border border-tinta/15 px-3 py-2 font-mono text-sm"
              />
              {editandoId !== "novo" && (
                <p className="text-xs text-tinta/50 mt-1">O slug não pode ser alterado após a criação.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea
                required
                rows={3}
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className="w-full rounded-lg border border-tinta/15 px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Capacidade</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={form.capacidade}
                  onChange={(e) => setForm({ ...form, capacidade: Number(e.target.value) })}
                  className="w-full rounded-lg border border-tinta/15 px-3 py-2 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Diária (R$)</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  required
                  value={form.precoDiaria}
                  onChange={(e) => setForm({ ...form, precoDiaria: Number(e.target.value) })}
                  className="w-full rounded-lg border border-tinta/15 px-3 py-2 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Unidades</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={form.totalUnidades}
                  onChange={(e) => setForm({ ...form, totalUnidades: Number(e.target.value) })}
                  className="w-full rounded-lg border border-tinta/15 px-3 py-2 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Comodidades (separadas por vírgula)
              </label>
              <input
                value={form.comodidades}
                onChange={(e) => setForm({ ...form, comodidades: e.target.value })}
                className="w-full rounded-lg border border-tinta/15 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={criar.isPending || editar.isPending}
                className="flex-1 rounded-lg bg-atlantico text-branco font-medium py-2.5 hover:bg-atlantico-escuro transition-colors disabled:opacity-60"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={fecharForm}
                className="flex-1 rounded-lg border border-tinta/15 font-medium py-2.5 hover:bg-tinta/5 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
