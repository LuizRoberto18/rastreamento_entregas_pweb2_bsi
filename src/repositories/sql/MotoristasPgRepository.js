import { AppError } from "../../utils/AppError.js";

/** @typedef {import("../contracts.js").IMotoristasRepository} IMotoristasRepository */


export class MotoristasPgRepository {
  constructor(pool) {
    this.pool = pool;
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
    const result = await this.pool.query(
      `
      SELECT
        id,
        nome,
        cpf,
        placa_veiculo AS "placaVeiculo",
        status
      FROM motoristas
      ORDER BY id ASC
      `
    );

    return result.rows.map((row) => this.mapMotorista(row));
  }

  async buscarPorId(id) {
    const result = await this.pool.query(
      `
      SELECT
        id,
        nome,
        cpf,
        placa_veiculo AS "placaVeiculo",
        status
      FROM motoristas
      WHERE id = $1
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return null;
    }

    return this.mapMotorista(result.rows[0]);
  }

  async buscarPorCPF(cpf) {
    const result = await this.pool.query(
      `
      SELECT
        id,
        nome,
        cpf,
        placa_veiculo AS "placaVeiculo",
        status
      FROM motoristas
      WHERE cpf = $1
      `,
      [cpf]
    );

    if (result.rowCount === 0) {
      return null;
    }

    return this.mapMotorista(result.rows[0]);
  }

  async criar(dados) {
    try {
      const result = await this.pool.query(
        `
        INSERT INTO motoristas (nome, cpf, placa_veiculo, status)
        VALUES ($1, $2, $3, $4)
        RETURNING
          id,
          nome,
          cpf,
          placa_veiculo AS "placaVeiculo",
          status
        `,
        [dados.nome, dados.cpf, dados.placaVeiculo, dados.status]
      );

      return this.mapMotorista(result.rows[0]);
    } catch (err) {
      if (err.code === "23505") {
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

    const result = await this.pool.query(
      `
      UPDATE motoristas
      SET
        nome = $1,
        cpf = $2,
        placa_veiculo = $3,
        status = $4
      WHERE id = $5
      RETURNING
        id,
        nome,
        cpf,
        placa_veiculo AS "placaVeiculo",
        status
      `,
      [dados.nome, dados.cpf, dados.placaVeiculo, dados.status, id]
    );

    return this.mapMotorista(result.rows[0]);
  }
}
