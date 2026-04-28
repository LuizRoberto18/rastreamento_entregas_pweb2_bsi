export class RelatoriosPrismaRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async entregasPorStatus() {
    const rows = await this.prisma.entrega.groupBy({
      by: ["status"],
      _count: {
        _all: true
      }
    });

    const agregado = {
      CRIADA: 0,
      EM_TRANSITO: 0,
      ENTREGUE: 0,
      CANCELADA: 0
    };

    for (const row of rows) {
      if (Object.prototype.hasOwnProperty.call(agregado, row.status)) {
        agregado[row.status] = row._count._all;
      }
    }

    return agregado;
  }

  async motoristasAtivosComEntregasEmAberto() {
    const rows = await this.prisma.motorista.findMany({
      where: {
        status: "ATIVO",
        entregas: {
          some: {
            status: {
              in: ["CRIADA", "EM_TRANSITO"]
            }
          }
        }
      },
      orderBy: {
        id: "asc"
      },
      include: {
        _count: {
          select: {
            entregas: {
              where: {
                status: {
                  in: ["CRIADA", "EM_TRANSITO"]
                }
              }
            }
          }
        }
      }
    });

    return rows.map((row) => ({
      motoristaId: row.id,
      nome: row.nome,
      entregasEmAberto: row._count.entregas
    }));
  }
}
