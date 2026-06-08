export class UsuariosPrismaRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async buscarPorEmail(email) {
    return this.prisma.usuario.findUnique({
      where: { email }
    });
  }

  async criar(dados) {
    return this.prisma.usuario.create({
      data: dados
    });
  }
}
