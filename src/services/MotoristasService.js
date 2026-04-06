import { AppError } from "../utils/AppError.js";

const STATUS_MOTORISTA = {
  ATIVO: "ATIVO",
  INATIVO: "INATIVO"
};

export class MotoristasService {
  /**
    * @param {IMotoristasRepository} motoristasRepository
   */
  constructor(motoristasRepository) {
    this.motoristasRepository = motoristasRepository;
  }

  async criarMotorista({ nome, cpf, placaVeiculo }) {
    const existente = await this.motoristasRepository.buscarPorCPF(cpf);

    if (existente) {
      throw new AppError("CPF já cadastrado no sistema", 409);
    }

    return this.motoristasRepository.criar({
      nome,
      cpf,
      placaVeiculo,
      status: STATUS_MOTORISTA.ATIVO
    });
  }

  async listarMotoristas() {
    return this.motoristasRepository.listarTodos();
  }

  async buscarPorId(id) {
    const motorista = await this.motoristasRepository.buscarPorId(Number(id));

    if (!motorista) {
      throw new AppError("Motorista não encontrado", 404);
    }

    return motorista;
  }
}
