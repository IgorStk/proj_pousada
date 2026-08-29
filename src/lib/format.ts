export function formatarMoeda(valor: number | string): string {
  const num = typeof valor === "string" ? Number(valor) : valor;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarData(data: string | Date): string {
  const d = typeof data === "string" ? new Date(data) : data;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export function paraISODate(data: string): string {
  // input type="date" já retorna YYYY-MM-DD
  return data;
}
