/** @typedef {import("../contracts.js").IEntregasRepository} IEntregasRepository */

/**
 * Repository SQL puro para entregas.
 *
 * Regras da atividade:
 * - Manter assinatura dos metodos do contrato da Atividade 06.
 * - Retornar null quando nao encontrar registro (nao lancar excecao).
 * - Traduzir erro de banco para erro de dominio na camada apropriada.
 *
 * Mapa de colunas (banco -> objeto JS):
 * - motorista_id -> motoristaId
 * - data_evento -> historico[].data
 */
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

        for (const row of result.rows) {
            const eventosResult = await this.pool.query(
                `
            SELECT data, descricao
            FROM entregas_historico
            WHERE entrega_id = $1
            ORDER BY data ASC
            `);

            entregas.push({
                id: row.id,
                descricao: row.descricao,
                origem: row.origem,
                destino: row.destino,
                status: row.status,
                motoristaId: row.motoristaId,
                historico: eventosResult.rows
            });
        }
        return entregas;
        throw new Error("TODO: implementar listarTodos com SQL parametrizado");
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
                historico: historicoResult.rows
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
                historico: dados.historico || []
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

            // 🔥 Estratégia simples: recriar histórico
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
                historico: dadosAtualizados.historico || []
            };

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }
}
