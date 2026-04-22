export class RelatoriosPgRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async entregasPorStatus() {
    const result = await this.pool.query(
      `
      SELECT status, COUNT(*)::int AS total
      FROM entregas
      GROUP BY status
      `
    );

    const agregado = {
      CRIADA: 0,
      EM_TRANSITO: 0,
      ENTREGUE: 0,
      CANCELADA: 0
    };

    for (const row of result.rows) {
      if (Object.prototype.hasOwnProperty.call(agregado, row.status)) {
        agregado[row.status] = row.total;
      }
    }

    return agregado;
  }

  async motoristasAtivosComEntregasEmAberto() {
    const result = await this.pool.query(
      `
      SELECT
        m.id AS "motoristaId",
        m.nome,
        COUNT(e.id)::int AS "entregasEmAberto"
      FROM motoristas m
      JOIN entregas e ON e.motorista_id = m.id
      WHERE m.status = 'ATIVO'
        AND e.status NOT IN ('ENTREGUE', 'CANCELADA')
      GROUP BY m.id, m.nome
      HAVING COUNT(e.id) > 0
      ORDER BY m.id ASC
      `
    );

    return result.rows.map((row) => ({
      motoristaId: row.motoristaId,
      nome: row.nome,
      entregasEmAberto: row.entregasEmAberto
    }));
  }
}
