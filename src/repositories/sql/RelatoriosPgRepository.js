/**
 * Repository dedicado a relatorios agregados (JOIN/GROUP BY).
 *
 * Observacao didatica:
 * - Este repository nao altera services existentes.
 * - Pode ser usado por controller/route propria de relatorios.
 *
 * RF-05 e implementado aqui (queries SQL agregadas).
 */
export class RelatoriosPgRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async entregasPorStatus() {
    // PASSO A PASSO:
    // 1) Executar query GROUP BY status para contar entregas por situacao.
    // 2) Iniciar objeto com todas as chaves em 0 para evitar status ausente.
    // 3) Percorrer rows e preencher objeto final.
    // 4) Retornar exatamente neste formato:
    //    { CRIADA: n, EM_TRANSITO: n, ENTREGUE: n, CANCELADA: n }
    throw new Error("TODO: implementar entregasPorStatus");
  }

  async motoristasAtivosComEntregasEmAberto() {
    // PASSO A PASSO:
    // 1) Fazer JOIN entre motoristas e entregas por motorista_id.
    // 2) Filtrar entregas em aberto: status NOT IN ('ENTREGUE', 'CANCELADA').
    // 3) Agrupar por motorista e contar entregas em aberto.
    // 4) Usar HAVING COUNT > 0 para trazer apenas motoristas ativos no relatorio.
    // 5) Mapear para formato de saida da rota:
    //    [{ motoristaId, nome, entregasEmAberto }, ...]
    throw new Error("TODO: implementar motoristasAtivosComEntregasEmAberto");
  }
}
