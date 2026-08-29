export interface TipoQuarto {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  capacidade: number;
  precoDiaria: string;
  totalUnidades: number;
  comodidades: string[];
  imagens: string[];
  ativo: boolean;
}

export interface TipoQuartoDisponivel extends TipoQuarto {
  unidadesLivres: number;
  disponivel: boolean;
  noites: number;
  valorTotalEstimado: number;
}

export type StatusReserva = "CONFIRMADA" | "CANCELADA" | "CONCLUIDA";

export interface Reserva {
  id: string;
  tipoQuartoId: string;
  tipoQuarto: TipoQuarto;
  checkIn: string;
  checkOut: string;
  hospedeNome: string;
  hospedeEmail: string;
  hospedeFone: string;
  adultos: number;
  criancas: number;
  observacoes?: string | null;
  valorTotal: string;
  status: StatusReserva;
  codigo: string;
  criadoEm: string;
}

export interface Admin {
  id: string;
  email: string;
  nome: string;
}
