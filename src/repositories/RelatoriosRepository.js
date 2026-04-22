export class RelatoriosRepository {
  constructor(database) {
    this.db = database;
  }

  async entregasPorStatus() {
    const agregado = {
      CRIADA: 0,
      EM_TRANSITO: 0,
      ENTREGUE: 0,
      CANCELADA: 0
    };

    for (const entrega of this.db.getEntregas()) {
      if (Object.prototype.hasOwnProperty.call(agregado, entrega.status)) {
        agregado[entrega.status] += 1;
      }
    }

    return agregado;
  }

  async motoristasAtivosComEntregasEmAberto() {
    const entregasEmAbertoPorMotorista = new Map();

    for (const entrega of this.db.getEntregas()) {
      if (typeof entrega.motoristaId !== "number") {
        continue;
      }

      if (["ENTREGUE", "CANCELADA"].includes(entrega.status)) {
        continue;
      }

      const atual = entregasEmAbertoPorMotorista.get(entrega.motoristaId) || 0;
      entregasEmAbertoPorMotorista.set(entrega.motoristaId, atual + 1);
    }

    return this.db
      .getMotoristas()
      .filter((motorista) => motorista.status === "ATIVO")
      .map((motorista) => ({
        motoristaId: motorista.id,
        nome: motorista.nome,
        entregasEmAberto: entregasEmAbertoPorMotorista.get(motorista.id) || 0
      }))
      .filter((item) => item.entregasEmAberto > 0);
  }
}