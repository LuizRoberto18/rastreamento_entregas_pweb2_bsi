/** @typedef {import("../contracts.js").IEntregasRepository} IEntregasRepository */


export class EntregasPgRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async listarTodos(filtros = {}) {
        const where = [];
        const values = [];
        // Filtro por status
        if (filtros.status) {
            values.push(filtros.status);
            where.push(`e.status = $${values.length}`);
        }
        // Filtro por motoristaId
        if (typeof filtros.motoristaId === "number") {
            values.push(filtros.motoristaId);
            where.push(`e.motorista_id = $${values.length}`);
        }

        //Monta where dinamico
        const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

        // const query = principal
        const sql = `
        SELECT
        e.id,
        e.descricao,
        e.origem,
        e.destino,
        e.status,
        e.motorista_id AS "motoristaId"
        FROM entregas e
        ${whereClause}
        ORDER BY e.id ASC
    `;

        const result = await this.pool.query(sql, values);
        const entregas = result.rows.map((row) => ({
            id: row.id,
            descricao: row.descricao,
            origem: row.origem,
            destino: row.destino,
            status: row.status,
            motoristaId: row.motoristaId,
            historico: []
        }));

        if (entregas.length === 0) {
            return entregas;
        }

        const entregaIds = entregas.map((entrega) => entrega.id);
        const eventosResult = await this.pool.query(
            `
            SELECT entrega_id, data_evento AS data, descricao
            FROM eventos_entrega
            WHERE entrega_id = ANY($1::bigint[])
            ORDER BY entrega_id ASC, data_evento ASC
            `,
            [entregaIds]
        );

        const historicoPorEntregaId = new Map();
        for (const evento of eventosResult.rows) {
            const atual = historicoPorEntregaId.get(evento.entrega_id) || [];
            atual.push({
                data: evento.data instanceof Date ? evento.data.toISOString() : evento.data,
                descricao: evento.descricao
            });
            historicoPorEntregaId.set(evento.entrega_id, atual);
        }

        for (const entrega of entregas) {
            entrega.historico = historicoPorEntregaId.get(entrega.id) || [];
        }

        return entregas;
    }

    async buscarPorId(id) {
        const client = await this.pool.connect();

        try {
            await client.query("BEGIN");

            const entregaResult = await client.query(
                `
            SELECT 
                id,
                descricao,
                origem,
                destino,
                status,
                motorista_id AS "motoristaId"
            FROM entregas
            WHERE id = $1
            `,
                [id]
            );

            if (entregaResult.rowCount === 0) {
                await client.query("COMMIT");
                return null;
            }

            const entrega = entregaResult.rows[0];

            const historicoResult = await client.query(
                `
            SELECT 
                data_evento AS data,
                descricao
            FROM eventos_entrega
            WHERE entrega_id = $1
            ORDER BY data_evento ASC
            `,
                [id]
            );

            await client.query("COMMIT");

            return {
                ...entrega,
                historico: historicoResult.rows.map((evento) => ({
                    data: evento.data instanceof Date ? evento.data.toISOString() : evento.data,
                    descricao: evento.descricao
                }))
            };

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    async criar(dados) {
        const client = await this.pool.connect();

        try {
            await client.query("BEGIN");

            const entregaResult = await client.query(
                `
            INSERT INTO entregas (descricao, origem, destino, status, motorista_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING 
                id,
                descricao,
                origem,
                destino,
                status,
                motorista_id AS "motoristaId"
            `,
                [
                    dados.descricao,
                    dados.origem,
                    dados.destino,
                    dados.status,
                    dados.motoristaId
                ]
            );

            const entrega = entregaResult.rows[0];

            // Inserir histórico
            if (dados.historico && dados.historico.length > 0) {
                for (const evento of dados.historico) {
                    await client.query(
                        `
                    INSERT INTO eventos_entrega (entrega_id, data_evento, descricao)
                    VALUES ($1, $2, $3)
                    `,
                        [entrega.id, evento.data, evento.descricao]
                    );
                }
            }

            await client.query("COMMIT");

            return {
                ...entrega,
                historico: (dados.historico || []).map((evento) => ({
                    data: evento.data instanceof Date ? evento.data.toISOString() : evento.data,
                    descricao: evento.descricao
                }))
            };

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    async atualizar(id, dadosAtualizados) {
        const client = await this.pool.connect();

        try {
            await client.query("BEGIN");

            // Verifica se existe
            const existe = await client.query(
                `SELECT id FROM entregas WHERE id = $1`,
                [id]
            );

            if (existe.rowCount === 0) {
                await client.query("COMMIT");
                return null;
            }

            // Atualiza entrega
            const updateResult = await client.query(
                `
            UPDATE entregas
            SET 
                descricao = $1,
                origem = $2,
                destino = $3,
                status = $4,
                motorista_id = $5
            WHERE id = $6
            RETURNING 
                id,
                descricao,
                origem,
                destino,
                status,
                motorista_id AS "motoristaId"
            `,
                [
                    dadosAtualizados.descricao,
                    dadosAtualizados.origem,
                    dadosAtualizados.destino,
                    dadosAtualizados.status,
                    dadosAtualizados.motoristaId,
                    id
                ]
            );

            const entrega = updateResult.rows[0];

            await client.query(
                `DELETE FROM eventos_entrega WHERE entrega_id = $1`,
                [id]
            );

            if (dadosAtualizados.historico && dadosAtualizados.historico.length > 0) {
                for (const evento of dadosAtualizados.historico) {
                    await client.query(
                        `
                    INSERT INTO eventos_entrega (entrega_id, data_evento, descricao)
                    VALUES ($1, $2, $3)
                    `,
                        [id, evento.data, evento.descricao]
                    );
                }
            }

            await client.query("COMMIT");

            return {
                ...entrega,
                historico: (dadosAtualizados.historico || []).map((evento) => ({
                    data: evento.data instanceof Date ? evento.data.toISOString() : evento.data,
                    descricao: evento.descricao
                }))
            };

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }
}
