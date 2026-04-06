import { AppError } from "../utils/AppError.js";

const STATUS = {
  CRIADA: "CRIADA",
  EM_TRANSITO: "EM_TRANSITO",
  ENTREGUE: "ENTREGUE",
  CANCELADA: "CANCELADA"
};

const STATUS_MOTORISTA = {
  ATIVO: "ATIVO",
  INATIVO: "INATIVO"
};

export class EntregasService {
  /**
    * @param {IEntregasRepository} entregasRepository
    * @param {IMotoristasRepository} motoristasRepository
   */
  constructor(entregasRepository, motoristasRepository) {
    this.entregasRepository = entregasRepository;
    this.motoristasRepository = motoristasRepository;
  }

  async criarEntrega({ descricao, origem, destino }) {
    if (origem === destino) {
      throw new AppError("Origem e destino não podem ser iguais", 400);
    }

    const entregas = await this.entregasRepository.listarTodos();

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
      descricao,
      origem,
      destino,
      status: STATUS.CRIADA,
      motoristaId: null,
      historico: [
        {
          data: new Date().toISOString(),
          descricao: "Entrega criada"
        }
      ]
    };

    return await this.entregasRepository.criar(novaEntrega);
  }

  async listarEntregas(filtros) {
    if (typeof filtros === "string") {
      return this.entregasRepository.listarTodos({ status: filtros });
    }

    return this.entregasRepository.listarTodos(filtros || {});
  }

  async listarEntregasPorMotorista(motoristaId, status) {
    const motoristaIdNumber = Number(motoristaId);
    const filtros = { motoristaId: motoristaIdNumber };

    if (status) {
      filtros.status = status;
    }

    return this.entregasRepository.listarTodos(filtros);
  }

  async buscarPorId(id) {
    const entrega = await this.entregasRepository.buscarPorId(Number(id));

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

    return await this.entregasRepository.atualizar(entrega.id, entrega);
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

    return await this.entregasRepository.atualizar(entrega.id, entrega);
  }

  async obterHistorico(id) {
    const entrega = await this.buscarPorId(id);
    return entrega.historico;
  }

  async atribuirMotorista(id, motoristaId) {
    const entrega = await this.buscarPorId(id);

    if (entrega.status !== STATUS.CRIADA) {
      throw new AppError("Apenas entregas com status CRIADA podem receber motorista", 422);
    }

    const motorista = await this.motoristasRepository.buscarPorId(Number(motoristaId));

    if (!motorista) {
      throw new AppError("Motorista não encontrado", 404);
    }

    if (motorista.status !== STATUS_MOTORISTA.ATIVO) {
      throw new AppError("Não é permitido atribuir motorista INATIVO", 422);
    }

    const substituiu = typeof entrega.motoristaId === "number" && entrega.motoristaId !== motorista.id;

    entrega.motoristaId = motorista.id;
    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: substituiu
        ? `Motorista substituído para ${motorista.nome}`
        : `Motorista atribuído: ${motorista.nome}`
    });

    return this.entregasRepository.atualizar(entrega.id, entrega);
  }
}