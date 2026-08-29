import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { TipoQuarto, TipoQuartoDisponivel } from "../types";

export function useTiposQuarto() {
  return useQuery({
    queryKey: ["tipos-quarto"],
    queryFn: async () => {
      const { data } = await api.get<TipoQuarto[]>("/room-types");
      return data;
    },
  });
}

export function useDisponibilidade(params: {
  checkIn: string;
  checkOut: string;
  hospedes?: number;
} | null) {
  return useQuery({
    queryKey: ["disponibilidade", params],
    queryFn: async () => {
      const { data } = await api.get<TipoQuartoDisponivel[]>(
        "/room-types/disponibilidade",
        { params },
      );
      return data;
    },
    enabled: !!params,
  });
}
