export class EntregasController {
    constructor(service) {
        this.service = service;
    }
    listarEntregas = async (req, res, next) => {
        try {
            const { status } = req.query;
            const result = await this.service.listarEntregas(status);

            if (result.length === 0) {
                return res.status(404).json({ message: "Nenhuma entrega cadastrada" })
            }
            res.json(result)
        } catch (err) {
            next(err);
        }
    }

    criarEntrega = async (req, res, next) => {
        try {
            const result = await this.service.criarEntrega(req.body);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    obterEntregaPorId = async (req, res, next) => {
        try {
            const result = await this.service.buscarPorId(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    avancarEntrega = async (req, res, next) => {
        try {
            const result = await this.service.avancarEntrega(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    cancelarEntrega = async (req, res, next) => {
        try {
            const result = await this.service.cancelarEntrega(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
    obterHistoricoEntrega = async (req, res, next) => {
        try {
            const result = await this.service.obterHistorico(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    atribuirMotorista = async (req, res, next) => {
        try {
            const { motoristaId } = req.body;
            const result = await this.service.atribuirMotorista(req.params.id, motoristaId);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

}