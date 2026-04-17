/** @typedef {Object} IEntregasRepository */

// TODO (Atividade 07):
// Este repository em memoria deve ser substituido por src/repositories/sql/EntregasPgRepository.js.
// Regra pedagogica: manter o mesmo contrato consumido pelo service.

/** @implements {IEntregasRepository} */
export class EntregasRepository {
    constructor(database) {
        this.db = database;
    }

    async listarTodos(filtros = {}) {
        let entregas = this.db.getEntregas();

        if (filtros.status) {
            entregas = entregas.filter(entrega => entrega.status === filtros.status);
        }

        if (typeof filtros.motoristaId === "number") {
            entregas = entregas.filter(entrega => entrega.motoristaId === filtros.motoristaId);
        }

        return entregas;
    }

    async buscarPorId(id) {
        return this.db.getEntregas().find(entrega => entrega.id === id);
    }

    async criar(dados) {
        const entrega = {
            ...dados,
            id: this.db.generateId()
        };

        this.db.entregas.push(entrega);

        return entrega;
    }

    async atualizar(id, dadosAtualizados) {
        const entregas = this.db.getEntregas();
        const index = entregas.findIndex(e => e.id === id);
        if (index === -1) {
            return null;
        }

        entregas[index] = { ...entregas[index], ...dadosAtualizados };
        return entregas[index];
    }
}