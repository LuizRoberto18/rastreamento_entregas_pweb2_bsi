import { AppError } from "../../utils/AppError.js";

export class MotoristasPrismaRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  mapMotorista(row) {
    return {
      id: row.id,
      nome: row.nome,
      cpf: row.cpf,
      placaVeiculo: row.placaVeiculo,
      status: row.status
    };
  }

  async listarTodos() {
    const rows = await this.prisma.motorista.findMany({
      orderBy: {
        id: "asc"
      }
    });

    return rows.map((row) => this.mapMotorista(row));
  }

  async buscarPorId(id) {
    const row = await this.prisma.motorista.findUnique({
      where: { id }
    });

    if (!row) {
      return null;
    }

    return this.mapMotorista(row);
  }

  async buscarPorCPF(cpf) {
    const row = await this.prisma.motorista.findUnique({
      where: { cpf }
    });

    if (!row) {
      return null;
    }

    return this.mapMotorista(row);
  }

  async criar(dados) {
    try {
      const row = await this.prisma.motorista.create({
        data: {
          nome: dados.nome,
          cpf: dados.cpf,
          placaVeiculo: dados.placaVeiculo,
          status: dados.status
        }
      });

      return this.mapMotorista(row);
    } catch (err) {
      if (err?.code === "P2002") {
        throw new AppError("CPF ja cadastrado no sistema", 409);
      }

      throw err;
    }
  }

  async atualizar(id, dados) {
    const existente = await this.buscarPorId(id);

    if (!existente) {
      return null;
    }

    const row = await this.prisma.motorista.update({
      where: { id },
      data: {
        nome: dados.nome,
        cpf: dados.cpf,
        placaVeiculo: dados.placaVeiculo,
        status: dados.status
      }
    });

    return this.mapMotorista(row);
  }
}
