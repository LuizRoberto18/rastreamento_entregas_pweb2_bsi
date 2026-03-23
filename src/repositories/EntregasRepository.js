export class EntregasRepository {
    constructor(database) {
        this.db = database;
    }

    async listarTodos() {
        return this.db.getEntregas();
    }
    async buscarPorId(id) {
        return this.db.getEntregas().find(entrega => entrega.id === id);
    }
    async criar(entrega) {
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