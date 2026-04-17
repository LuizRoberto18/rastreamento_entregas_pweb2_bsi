import { AppError } from "../../utils/AppError.js";

/** @typedef {import("../contracts.js").IMotoristasRepository} IMotoristasRepository */

/**
 * Repository SQL puro para motoristas.
 *
 * Regra importante:
 * - Violacao UNIQUE de CPF (codigo 23505) deve virar erro de dominio (ex.: AppError 409).
 *
 * Onde esta regra impacta:
 * - Metodo criar(dados), no bloco catch.
 */
export class MotoristasPgRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async listarTodos() {
    // PASSO A PASSO:
    // 1) Fazer SELECT das colunas necessarias em motoristas.
    // 2) Ordenar por id para resposta previsivel.
    // 3) Mapear placa_veiculo -> placaVeiculo.
    throw new Error("TODO: implementar listarTodos");
  }

  async buscarPorId(id) {
    // PASSO A PASSO:
    // 1) SELECT por id com parametro.
    // 2) Se nao houver linha, retornar null.
    // 3) Se houver, mapear para objeto de dominio.
    throw new Error("TODO: implementar buscarPorId");
  }

  async buscarPorCPF(cpf) {
    // PASSO A PASSO:
    // 1) SELECT por cpf com parametro.
    // 2) Se nao encontrar, retornar null (nao lancar excecao).
    // 3) Se encontrar, retornar objeto do motorista.
    throw new Error("TODO: implementar buscarPorCPF");
  }

  async criar(dados) {
    // PASSO A PASSO:
    // 1) Executar INSERT em motoristas com RETURNING.
    // 2) Envolver em try/catch.
    // 3) No catch, verificar err.code === "23505" (UNIQUE).
    // 4) Quando for 23505, lancar AppError com status 409.
    // 5) Para qualquer outro erro, relancar erro original.

    // Exemplo de regra:
    // if (err.code === "23505") {
    //   throw new AppError("CPF ja cadastrado no sistema", 409);
    // }

    throw new Error("TODO: implementar criar com tratamento de UNIQUE");
  }

  async atualizar(id, dados) {
    // PASSO A PASSO:
    // 1) Verificar se motorista existe; se nao, retornar null.
    // 2) Executar UPDATE apenas dos campos permitidos.
    // 3) Usar RETURNING para devolver estado final.
    // 4) Mapear snake_case para camelCase.
    throw new Error("TODO: implementar atualizar");
  }
}
