export class EntregasPrismaRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  mapEntrega(entrega) {
    return {
      id: entrega.id,
      descricao: entrega.descricao,
      origem: entrega.origem,
      destino: entrega.destino,
      status: entrega.status,
      motoristaId: entrega.motoristaId,
      criadorId: entrega.criadorId,
      historico: (entrega.eventos || []).map((evento) => ({
        data: evento.dataEvento.toISOString(),
        descricao: evento.descricao
      }))
    };
  }

  buildWhere(filtros = {}) {
    const where = {};

    if (filtros.status) {
      where.status = filtros.status;
    }

    if (typeof filtros.motoristaId === "number") {
      where.motoristaId = filtros.motoristaId;
    }

    if (filtros.createdDe || filtros.createdAte) {
      where.createdAt = {};

      if (filtros.createdDe) {
        where.createdAt.gte = filtros.createdDe;
      }

      if (filtros.createdAte) {
        where.createdAt.lte = filtros.createdAte;
      }
    }

    return where;
  }

  async listarTodos(filtros = {}) {
    const page = Number(filtros.page) > 0 ? Number(filtros.page) : null;
    const limit = Number(filtros.limit) > 0 ? Number(filtros.limit) : null;

    const entregas = await this.prisma.entrega.findMany({
      where: this.buildWhere(filtros),
      include: {
        eventos: {
          orderBy: {
            dataEvento: "asc"
          }
        }
      },
      orderBy: {
        id: "asc"
      },
      ...(page && limit
        ? {
          skip: (page - 1) * limit,
          take: limit
        }
        : {})
    });

    return entregas.map((entrega) => this.mapEntrega(entrega));
  }

  async buscarPorId(id) {
    const entrega = await this.prisma.entrega.findUnique({
      where: { id },
      include: {
        eventos: {
          orderBy: {
            dataEvento: "asc"
          }
        }
      }
    });

    if (!entrega) {
      return null;
    }

    return this.mapEntrega(entrega);
  }

  async buscarEntregaAtiva({ descricao, origem, destino }) {
    const entrega = await this.prisma.entrega.findFirst({
      where: {
        descricao,
        origem,
        destino,
        status: {
          notIn: ["ENTREGUE", "CANCELADA"]
        }
      },
      include: {
        eventos: {
          orderBy: { dataEvento: "asc" }
        }
      }
    });

    return entrega ? this.mapEntrega(entrega) : null;
  }

  async criar(dados) {
    const entrega = await this.prisma.entrega.create({
      data: {
        descricao: dados.descricao,
        origem: dados.origem,
        destino: dados.destino,
        status: dados.status,
        motoristaId: dados.motoristaId ?? null,
        criadorId: dados.criadorId ?? null,
        eventos: {
          create: (dados.historico || []).map((evento) => ({
            dataEvento: new Date(evento.data),
            descricao: evento.descricao
          }))
        }
      },
      include: {
        eventos: {
          orderBy: {
            dataEvento: "asc"
          }
        }
      }
    });

    return this.mapEntrega(entrega);
  }

  async atualizar(id, dadosAtualizados) {
    const entregaExistente = await this.prisma.entrega.findUnique({
      where: { id },
      select: { id: true }
    });

    if (!entregaExistente) {
      return null;
    }

    const entrega = await this.prisma.$transaction(async (tx) => {
      await tx.eventoEntrega.deleteMany({
        where: { entregaId: id }
      });

      return tx.entrega.update({
        where: { id },
        data: {
          descricao: dadosAtualizados.descricao,
          origem: dadosAtualizados.origem,
          destino: dadosAtualizados.destino,
          status: dadosAtualizados.status,
          motoristaId: dadosAtualizados.motoristaId ?? null,
          criadorId: dadosAtualizados.criadorId ?? null,
          eventos: {
            create: (dadosAtualizados.historico || []).map((evento) => ({
              dataEvento: new Date(evento.data),
              descricao: evento.descricao
            }))
          }
        },
        include: {
          eventos: {
            orderBy: {
              dataEvento: "asc"
            }
          }
        }
      });
    });

    return this.mapEntrega(entrega);
  }
  async contar(filtros = {}) {
    return this.prisma.entrega.count({
      where: this.buildWhere(filtros)
    });
  }
}
