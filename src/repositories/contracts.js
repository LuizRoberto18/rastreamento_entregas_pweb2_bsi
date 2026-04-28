/**
 * @typedef {Object} HistoricoEntrega
 * @property {string} data
 * @property {string} descricao
 *
 * @typedef {Object} Entrega
 * @property {number} id
 * @property {string} descricao
 * @property {string} origem
 * @property {string} destino
 * @property {"CRIADA"|"EM_TRANSITO"|"ENTREGUE"|"CANCELADA"} status
 * @property {number|null} motoristaId
 * @property {HistoricoEntrega[]} historico
 *
 * @typedef {Object} Motorista
 * @property {number} id
 * @property {string} nome
 * @property {string} cpf
 * @property {string} placaVeiculo
 * @property {"ATIVO"|"INATIVO"} status
 */

/**
 * @typedef {Object} EntregasFiltros
 * @property {string} [status]
 * @property {number} [motoristaId]
 * @property {Date} [createdDe]
 * @property {Date} [createdAte]
 * @property {number} [page]
 * @property {number} [limit]
 */

/**
 * Contrato esperado para persistencia de entregas.
 * @interface
 */
export class IEntregasRepository {
  /**
   * @param {EntregasFiltros} [filtros]
   * @returns {Promise<Entrega[]>}
   */
  async listarTodos(filtros) {}

  /**
   * @param {number} id
   * @returns {Promise<Entrega|null>}
   */
  async buscarPorId(id) {}

  /**
   * @param {Partial<Entrega>} dados
   * @returns {Promise<Entrega>}
   */
  async criar(dados) {}

  /**
   * @param {number} id
   * @param {Partial<Entrega>} dados
   * @returns {Promise<Entrega|null>}
   */
  async atualizar(id, dados) {}
}

/**
 * Contrato esperado para persistencia de motoristas.
 * @interface
 */
export class IMotoristasRepository {
  /**
   * @returns {Promise<Motorista[]>}
   */
  async listarTodos() {}

  /**
   * @param {number} id
   * @returns {Promise<Motorista|null>}
   */
  async buscarPorId(id) {}

  /**
   * @param {string} cpf
   * @returns {Promise<Motorista|null>}
   */
  async buscarPorCPF(cpf) {}

  /**
   * @param {Partial<Motorista>} dados
   * @returns {Promise<Motorista>}
   */
  async criar(dados) {}

  /**
   * @param {number} id
   * @param {Partial<Motorista>} dados
   * @returns {Promise<Motorista|null>}
   */
  async atualizar(id, dados) {}
}
