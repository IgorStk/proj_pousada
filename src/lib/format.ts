export function formatarMoeda(valor: number | string): string {
  const num = typeof valor === "string" ? Number(valor) : valor;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarData(data: string | Date): string {
  const valor = typeof data === "string" ? data.slice(0, 10) : dataParaISO(data);
  const [ano, mes, dia] = valor.split("-").map(Number);
  const d = new Date(ano, mes - 1, dia);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export function dataParaISO(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

export function adicionarDias(data: string, dias: number): string {
  const [ano, mes, dia] = data.split("-").map(Number);
  const resultado = new Date(ano, mes - 1, dia);
  resultado.setDate(resultado.getDate() + dias);
  return dataParaISO(resultado);
}

export function noitesEntreDatas(dataInicial: string, dataFinal: string): number {
  const [anoInicial, mesInicial, diaInicial] = dataInicial.split("-").map(Number);
  const [anoFinal, mesFinal, diaFinal] = dataFinal.split("-").map(Number);
  return (
    (Date.UTC(anoFinal, mesFinal - 1, diaFinal) -
      Date.UTC(anoInicial, mesInicial - 1, diaInicial)) /
    86_400_000
  );
}
