export class EntregasService {
    constructor(repository) {
        this.repository = repository;
    }

    async listarTodos() {
        return this.repository.listarTodos();
    }
    async criar(dados) {
        const {
            id,
            descricao,
            origem,
            destino,
            status,
            historico: [
                {
                    data,
                    hisDescricao
                }
            ]
        }
            = dados;
        const jaExiste = await this.repository.buscarPorDescricao(descricao);
        if (jaExiste) throw new AppError('Entrega já cadastrada', 409);

        return this.repository.criar(dados);
    }
}