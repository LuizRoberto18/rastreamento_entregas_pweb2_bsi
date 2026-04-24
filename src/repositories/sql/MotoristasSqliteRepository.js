import { AppError } from "../../utils/AppError.js";

export class MotoristasSqliteRepository {
  constructor(db) {
    this.db = db;
  }

  mapMotorista(row) {
    if (!row) {
      return null;
    }

    return {
      id: row.id,
      nome: row.nome,
      cpf: row.cpf,
      placaVeiculo: row.placaVeiculo,
      status: row.status
    };
  }

  async listarTodos() {
    const rows = this.db
      .prepare(
        `
        SELECT
          id,
          nome,
          cpf,
          placa_veiculo AS placaVeiculo,
          status
        FROM motoristas
        ORDER BY id ASC
      `
      )
      .all();

    return rows.map((row) => this.mapMotorista(row));
  }

  async buscarPorId(id) {
    const row = this.db
      .prepare(
        `
        SELECT
          id,
          nome,
          cpf,
          placa_veiculo AS placaVeiculo,
          status
        FROM motoristas
        WHERE id = ?
      `
      )
      .get(id);

    return this.mapMotorista(row);
  }

  async buscarPorCPF(cpf) {
    const row = this.db
      .prepare(
        `
        SELECT
          id,
          nome,
          cpf,
          placa_veiculo AS placaVeiculo,
          status
        FROM motoristas
        WHERE cpf = ?
      `
      )
      .get(cpf);

    return this.mapMotorista(row);
  }

  async criar(dados) {
    try {
      const result = this.db
        .prepare(
          `
          INSERT INTO motoristas (nome, cpf, placa_veiculo, status)
          VALUES (?, ?, ?, ?)
        `
        )
        .run(dados.nome, dados.cpf, dados.placaVeiculo, dados.status);

      return this.buscarPorId(Number(result.lastInsertRowid));
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE" || String(error.message).includes("motoristas.cpf")) {
        throw new AppError("CPF ja cadastrado no sistema", 409);
      }

      throw error;
    }
  }

  async atualizar(id, dados) {
    const existente = await this.buscarPorId(id);

    if (!existente) {
      return null;
    }

    this.db
      .prepare(
        `
        UPDATE motoristas
        SET
          nome = ?,
          cpf = ?,
          placa_veiculo = ?,
          status = ?,
          atualizado_em = CURRENT_TIMESTAMP
        WHERE id = ?
      `
      )
      .run(dados.nome, dados.cpf, dados.placaVeiculo, dados.status, id);

    return this.buscarPorId(id);
  }
}
