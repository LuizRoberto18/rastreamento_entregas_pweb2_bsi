export class MotoristasController {
  constructor(motoristasService, entregasService) {
    this.motoristasService = motoristasService;
    this.entregasService = entregasService;
  }

  criarMotorista = async (req, res, next) => {
    try {
      const result = await this.motoristasService.criarMotorista(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  listarMotoristas = async (req, res, next) => {
    try {
      const result = await this.motoristasService.listarMotoristas();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  obterMotoristaPorId = async (req, res, next) => {
    try {
      const result = await this.motoristasService.buscarPorId(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  listarEntregasPorMotorista = async (req, res, next) => {
    try {
      await this.motoristasService.buscarPorId(req.params.id);

      const { status } = req.query;
      const result = await this.entregasService.listarEntregasPorMotorista(req.params.id, status);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
