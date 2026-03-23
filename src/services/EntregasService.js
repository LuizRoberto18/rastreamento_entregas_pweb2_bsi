import { AppError } from "../utils/AppError.js";

const STATUS = {
  CRIADA: "CRIADA",
  EM_TRANSITO: "EM_TRANSITO",
  ENTREGUE: "ENTREGUE",
  CANCELADA: "CANCELADA"
};

export class EntregasService {
  constructor(repository) {
    this.repository = repository;
  }

  async criarEntrega({ descricao, origem, destino }) {
    if (origem === destino) {
      throw new AppError("Origem e destino não podem ser iguais", 400);
    }

    const entregas = await this.repository.listarTodos();

    const duplicada = entregas.find(e =>
      e.descricao === descricao &&
      e.origem === origem &&
      e.destino === destino &&
      ![STATUS.ENTREGUE, STATUS.CANCELADA].includes(e.status)
    );

    if (duplicada) {
      throw new AppError("Entrega duplicada ativa", 400);
    }

    const novaEntrega = {
      id: this.repository.db.generateId(),
      descricao,
      origem,
      destino,
      status: STATUS.CRIADA,
      historico: [
        {
          data: new Date().toISOString(),
          descricao: "Entrega criada"
        }
      ]
    };

    return await this.repository.criar(novaEntrega);
  }

  async listarEntregas(status) {
    const entregas = await this.repository.listarTodos();

    if (status) {
      return entregas.filter(e => e.status === status);
    }

    return entregas;
  }

  async buscarPorId(id) {
    const entrega = await this.repository.buscarPorId(Number(id));

    if (!entrega) {
      throw new AppError("Entrega não encontrada", 404);
    }

    return entrega;
  }

  async avancarEntrega(id) {
    const entrega = await this.buscarPorId(id);

    if ([STATUS.ENTREGUE, STATUS.CANCELADA].includes(entrega.status)) {
      throw new AppError("Entrega já finalizada", 400);
    }

    if (entrega.status === STATUS.CRIADA) {
      entrega.status = STATUS.EM_TRANSITO;
      entrega.historico.push({
        data: new Date().toISOString(),
        descricao: "Saiu para entrega"
      });
    } else if (entrega.status === STATUS.EM_TRANSITO) {
      entrega.status = STATUS.ENTREGUE;
      entrega.historico.push({
        data: new Date().toISOString(),
        descricao: "Entrega finalizada"
      });
    } else {
      throw new AppError("Transição inválida", 400);
    }

    return await this.repository.atualizar(entrega.id, entrega);
  }

  async cancelarEntrega(id) {
    const entrega = await this.buscarPorId(id);

    if (entrega.status === STATUS.ENTREGUE) {
      throw new AppError("Não é possível cancelar entrega finalizada", 400);
    }

    if (entrega.status === STATUS.CANCELADA) {
      throw new AppError("Entrega já cancelada", 400);
    }

    entrega.status = STATUS.CANCELADA;
    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: "Entrega cancelada"
    });

    return await this.repository.atualizar(entrega.id, entrega);
  }

  async obterHistorico(id) {
    const entrega = await this.buscarPorId(id);
    return entrega.historico;
  }
}