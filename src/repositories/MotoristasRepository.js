/** @typedef {Object} IMotoristasRepository */

/** @implements {IMotoristasRepository} */
export class MotoristasRepository {
  constructor(database) {
    this.db = database;
  }

  async listarTodos() {
    return this.db.getMotoristas();
  }

  async buscarPorId(id) {
    return this.db.getMotoristas().find((motorista) => motorista.id === id) || null;
  }

  async buscarPorCPF(cpf) {
    return this.db.getMotoristas().find((motorista) => motorista.cpf === cpf) || null;
  }

  async criar(dados) {
    const motorista = {
      ...dados,
      id: this.db.generateMotoristaId()
    };

    this.db.motoristas.push(motorista);

    return motorista;
  }

  async atualizar(id, dados) {
    const motoristas = this.db.getMotoristas();
    const index = motoristas.findIndex((m) => m.id === id);

    if (index === -1) {
      return null;
    }

    motoristas[index] = { ...motoristas[index], ...dados };
    return motoristas[index];
  }
}
