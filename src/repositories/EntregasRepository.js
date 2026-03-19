import { Database } from "../database/database";

const dataBase = new Database();

export class EntregasRepository {

    async listarTodos() {
        return dataBase.getEntregas();
    }
    async buscarPorId(id) {
        return dataBase.getEntregas();
    }
    async criar(dados) {
        const novaEntrega = { id: dataBase.nextId++, ...dados };
        dataBase.entregas.push(novaEntrega);
        return novaEntrega;
    }

    async atualizar(id, { }) { }
}