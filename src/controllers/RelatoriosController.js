export class RelatoriosController {
  constructor(relatoriosRepository) {
    this.relatoriosRepository = relatoriosRepository;
  }

  getEntregasPorStatus = async (req, res, next) => {
    try {
      const resultado = await this.relatoriosRepository.entregasPorStatus();
      res.json(resultado);
    } catch (err) {
      next(err);
    }
  };

  getMotoristasAtivos = async (req, res, next) => {
    try {
      const resultado = await this.relatoriosRepository.motoristasAtivosComEntregasEmAberto();
      res.json(resultado);
    } catch (err) {
      next(err);
    }
  };
}
