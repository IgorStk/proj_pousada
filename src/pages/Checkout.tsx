import { useState } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { formatarData, formatarMoeda } from "../lib/format";
import type { Reserva, TipoQuarto } from "../types";

const schema = z.object({
  hospedeNome: z.string().min(3, "Informe seu nome completo"),
  hospedeEmail: z.string().email("E-mail inválido"),
  hospedeFone: z.string().min(8, "Informe um telefone válido"),
  adultos: z.number().min(1),
  criancas: z.number().min(0),
  observacoes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function Checkout() {
  const { tipoQuartoId } = useParams<{ tipoQuartoId: string }>();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [erroApi, setErroApi] = useState<string | null>(null);

  const checkIn = params.get("checkIn")!;
  const checkOut = params.get("checkOut")!;
  const hospedesQuery = Number(params.get("hospedes") ?? 2);

  const { data: tipo, isLoading } = useQuery({
    queryKey: ["tipo-quarto", tipoQuartoId],
    queryFn: async () => {
      const { data } = await api.get<TipoQuarto>(`/room-types/${tipoQuartoId}`);
      return data;
    },
    enabled: !!tipoQuartoId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { adultos: hospedesQuery, criancas: 0 },
  });

  const mutation = useMutation({
    mutationFn: async (form: FormData) => {
      const { data } = await api.post<Reserva>("/reservations", {
        tipoQuartoId,
        checkIn,
        checkOut,
        ...form,
      });
      return data;
    },
    onSuccess: (reserva) =>
      navigate(`/reserva-confirmada/${reserva.codigo}`, { state: { reserva } }),
    onError: (err: any) => {
      setErroApi(
        err?.response?.data?.message ??
          "Não foi possível concluir a reserva. Tente novamente.",
      );
    },
  });

  const noites =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 1;
  const total = tipo ? Number(tipo.precoDiaria) * noites : 0;

  return (
    <>
      <Header />
      <main className="bg-areia-clara min-h-[70vh]">
        <div className="mx-auto max-w-3xl px-5 md:px-8 py-12 md:py-16">
          <Link to="/" className="text-sm text-atlantico hover:underline">
            ← Voltar
          </Link>

          <h1 className="font-display text-3xl md:text-4xl text-atlantico mt-4 mb-2">
            Confirmar reserva
          </h1>

          {isLoading && <p className="text-tinta/60 mt-6">Carregando...</p>}

          {tipo && (
            <>
              <div className="bg-branco rounded-xl border border-tinta/10 p-5 mt-6 mb-8">
                <h2 className="font-display text-xl text-atlantico">{tipo.nome}</h2>
                <p className="font-mono text-sm text-tinta/60 mt-1">
                  {formatarData(checkIn)} → {formatarData(checkOut)} · {noites}{" "}
                  {noites === 1 ? "noite" : "noites"}
                </p>
                <p className="font-mono text-lg text-atlantico mt-2">
                  {formatarMoeda(total)} <span className="text-xs font-body text-tinta/50">total</span>
                </p>
              </div>

              <form
                onSubmit={handleSubmit((data) => {
                  setErroApi(null);
                  mutation.mutate(data);
                })}
                className="bg-branco rounded-xl border border-tinta/10 p-5 md:p-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Nome completo</label>
                  <input
                    {...register("hospedeNome")}
                    className="w-full rounded-lg border border-tinta/15 px-3 py-2.5"
                  />
                  {errors.hospedeNome && (
                    <p className="text-bugambilia-escura text-xs mt-1">
                      {errors.hospedeNome.message}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">E-mail</label>
                    <input
                      type="email"
                      {...register("hospedeEmail")}
                      className="w-full rounded-lg border border-tinta/15 px-3 py-2.5"
                    />
                    {errors.hospedeEmail && (
                      <p className="text-bugambilia-escura text-xs mt-1">
                        {errors.hospedeEmail.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <input
                      {...register("hospedeFone")}
                      placeholder="(85) 90000-0000"
                      className="w-full rounded-lg border border-tinta/15 px-3 py-2.5"
                    />
                    {errors.hospedeFone && (
                      <p className="text-bugambilia-escura text-xs mt-1">
                        {errors.hospedeFone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Adultos</label>
                    <input
                      type="number"
                      min={1}
                      {...register("adultos", { valueAsNumber: true })}
                      className="w-full rounded-lg border border-tinta/15 px-3 py-2.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Crianças</label>
                    <input
                      type="number"
                      min={0}
                      {...register("criancas", { valueAsNumber: true })}
                      className="w-full rounded-lg border border-tinta/15 px-3 py-2.5 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Observações (opcional)
                  </label>
                  <textarea
                    {...register("observacoes")}
                    rows={3}
                    className="w-full rounded-lg border border-tinta/15 px-3 py-2.5"
                  />
                </div>

                {erroApi && (
                  <p className="text-bugambilia-escura text-sm bg-bugambilia/10 rounded-lg px-3 py-2">
                    {erroApi}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full rounded-lg bg-bugambilia text-branco font-medium py-3 hover:bg-bugambilia-escura transition-colors disabled:opacity-60"
                >
                  {mutation.isPending ? "Confirmando..." : "Confirmar reserva"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
