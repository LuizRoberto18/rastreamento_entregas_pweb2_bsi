export class EntregasSqliteRepository {
  constructor(db) {
    this.db = db;
  }

  async listarTodos(filtros = {}) {
    const where = [];
    const params = [];

    if (filtros.status) {
      where.push("status = ?");
      params.push(filtros.status);
    }

    if (typeof filtros.motoristaId === "number") {
      where.push("motorista_id = ?");
      params.push(filtros.motoristaId);
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    const entregas = this.db
      .prepare(
        `
        SELECT
          id,
          descricao,
          origem,
          destino,
          status,
          motorista_id AS motoristaId
        FROM entregas
        ${whereClause}
        ORDER BY id ASC
      `
      )
      .all(...params);

    if (entregas.length === 0) {
      return [];
    }

    const entregaIds = entregas.map((entrega) => entrega.id);
    const placeholders = entregaIds.map(() => "?").join(", ");

    const eventos = this.db
      .prepare(
        `
        SELECT
          entrega_id AS entregaId,
          data_evento AS data,
          descricao
        FROM eventos_entrega
        WHERE entrega_id IN (${placeholders})
        ORDER BY entrega_id ASC, data_evento ASC
      `
      )
      .all(...entregaIds);

    const historicoPorEntregaId = new Map();

    for (const evento of eventos) {
      const atual = historicoPorEntregaId.get(evento.entregaId) || [];
      atual.push({ data: evento.data, descricao: evento.descricao });
      historicoPorEntregaId.set(evento.entregaId, atual);
    }

    return entregas.map((entrega) => ({
      ...entrega,
      historico: historicoPorEntregaId.get(entrega.id) || []
    }));
  }

  async buscarPorId(id) {
    const entrega = this.db
      .prepare(
        `
        SELECT
          id,
          descricao,
          origem,
          destino,
          status,
          motorista_id AS motoristaId
        FROM entregas
        WHERE id = ?
      `
      )
      .get(id);

    if (!entrega) {
      return null;
    }

    const historico = this.db
      .prepare(
        `
        SELECT
          data_evento AS data,
          descricao
        FROM eventos_entrega
        WHERE entrega_id = ?
        ORDER BY data_evento ASC
      `
      )
      .all(id)
      .map((evento) => ({ data: evento.data, descricao: evento.descricao }));

    return { ...entrega, historico };
  }

  async criar(dados) {
    const criarEntrega = this.db.prepare(
      `
      INSERT INTO entregas (descricao, origem, destino, status, motorista_id)
      VALUES (?, ?, ?, ?, ?)
    `
    );

    const inserirEvento = this.db.prepare(
      `
      INSERT INTO eventos_entrega (entrega_id, data_evento, descricao)
      VALUES (?, ?, ?)
    `
    );

    const tx = this.db.transaction((dadosEntrega) => {
      const result = criarEntrega.run(
        dadosEntrega.descricao,
        dadosEntrega.origem,
        dadosEntrega.destino,
        dadosEntrega.status,
        dadosEntrega.motoristaId ?? null
      );

      const entregaId = Number(result.lastInsertRowid);
      const historico = dadosEntrega.historico || [];

      for (const evento of historico) {
        inserirEvento.run(entregaId, evento.data, evento.descricao);
      }

      return {
        id: entregaId,
        descricao: dadosEntrega.descricao,
        origem: dadosEntrega.origem,
        destino: dadosEntrega.destino,
        status: dadosEntrega.status,
        motoristaId: dadosEntrega.motoristaId ?? null,
        historico: historico.map((evento) => ({ data: evento.data, descricao: evento.descricao }))
      };
    });

    return tx(dados);
  }

  async atualizar(id, dadosAtualizados) {
    const entregaAtual = this.db
      .prepare("SELECT id FROM entregas WHERE id = ?")
      .get(id);

    if (!entregaAtual) {
      return null;
    }

    const atualizarEntrega = this.db.prepare(
      `
      UPDATE entregas
      SET
        descricao = ?,
        origem = ?,
        destino = ?,
        status = ?,
        motorista_id = ?,
        atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    );

    const removerEventos = this.db.prepare(
      "DELETE FROM eventos_entrega WHERE entrega_id = ?"
    );

    const inserirEvento = this.db.prepare(
      `
      INSERT INTO eventos_entrega (entrega_id, data_evento, descricao)
      VALUES (?, ?, ?)
    `
    );

    const tx = this.db.transaction((entregaId, dadosEntrega) => {
      atualizarEntrega.run(
        dadosEntrega.descricao,
        dadosEntrega.origem,
        dadosEntrega.destino,
        dadosEntrega.status,
        dadosEntrega.motoristaId ?? null,
        entregaId
      );

      removerEventos.run(entregaId);

      const historico = dadosEntrega.historico || [];
      for (const evento of historico) {
        inserirEvento.run(entregaId, evento.data, evento.descricao);
      }

      return {
        id: entregaId,
        descricao: dadosEntrega.descricao,
        origem: dadosEntrega.origem,
        destino: dadosEntrega.destino,
        status: dadosEntrega.status,
        motoristaId: dadosEntrega.motoristaId ?? null,
        historico: historico.map((evento) => ({ data: evento.data, descricao: evento.descricao }))
      };
    });

    return tx(id, dadosAtualizados);
  }
}
