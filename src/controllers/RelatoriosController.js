export class RelatoriosController {
  constructor(relatoriosRepository) {
    this.relatoriosRepository = relatoriosRepository;
  }

  getEntregasPorStatus = async (req, res, next) => {
    try {
      // PASSO A PASSO:
      // 1) Chamar this.relatoriosRepository.entregasPorStatus().
      // 2) Receber objeto agregado.
      // 3) Retornar com res.json(objeto).
      // 4) Em caso de erro, manter fluxo no next(err).
      throw new Error("TODO: implementar getEntregasPorStatus");
    } catch (err) {
      next(err);
    }
  };

  getMotoristasAtivos = async (req, res, next) => {
    try {
      // PASSO A PASSO:
      // 1) Chamar this.relatoriosRepository.motoristasAtivosComEntregasEmAberto().
      // 2) Receber array de motoristas com contagem.
      // 3) Retornar com res.json(array).
      // 4) Em caso de erro, manter fluxo no next(err).
      throw new Error("TODO: implementar getMotoristasAtivos");
    } catch (err) {
      next(err);
    }
  };
}
