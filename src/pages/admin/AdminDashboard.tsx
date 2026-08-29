import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { formatarData, formatarMoeda } from "../../lib/format";
import type { Reserva, StatusReserva } from "../../types";

const STATUS_STYLE: Record<StatusReserva, string> = {
  CONFIRMADA: "bg-marinha/20 text-marinha-escura",
  CANCELADA: "bg-bugambilia/15 text-bugambilia-escura",
  CONCLUIDA: "bg-tinta/10 text-tinta/60",
};

export function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data: reservas, isLoading } = useQuery({
    queryKey: ["admin-reservas"],
    queryFn: async () => {
      const { data } = await api.get<Reserva[]>("/reservations");
      return data;
    },
  });

  const atualizarStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: StatusReserva }) =>
      api.patch(`/reservations/${id}/status`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-reservas"] }),
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-atlantico mb-6">Reservas</h1>

      {isLoading && <p className="text-tinta/60">Carregando...</p>}

      {reservas && reservas.length === 0 && (
        <p className="text-tinta/60">Nenhuma reserva ainda.</p>
      )}

      {reservas && reservas.length > 0 && (
        <div className="bg-branco rounded-xl border border-tinta/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-tinta/50 border-b border-tinta/10">
                <th className="px-4 py-3 font-medium">Código</th>
                <th className="px-4 py-3 font-medium">Hóspede</th>
                <th className="px-4 py-3 font-medium">Quarto</th>
                <th className="px-4 py-3 font-medium">Check-in</th>
                <th className="px-4 py-3 font-medium">Check-out</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id} className="border-b border-tinta/5 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{r.codigo}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{r.hospedeNome}</p>
                    <p className="text-xs text-tinta/50">{r.hospedeEmail}</p>
                  </td>
                  <td className="px-4 py-3">{r.tipoQuarto.nome}</td>
                  <td className="px-4 py-3 font-mono text-xs">{formatarData(r.checkIn)}</td>
                  <td className="px-4 py-3 font-mono text-xs">{formatarData(r.checkOut)}</td>
                  <td className="px-4 py-3 font-mono">{formatarMoeda(r.valorTotal)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) =>
                        atualizarStatus.mutate({
                          id: r.id,
                          status: e.target.value as StatusReserva,
                        })
                      }
                      className={`text-xs rounded-full px-2.5 py-1 border-0 ${STATUS_STYLE[r.status]}`}
                    >
                      <option value="CONFIRMADA">Confirmada</option>
                      <option value="CANCELADA">Cancelada</option>
                      <option value="CONCLUIDA">Concluída</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
