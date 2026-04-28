import { AppError } from "../utils/AppError.js";

export class EntregasController {
    constructor(service) {
        this.service = service;
    }
    listarEntregas = async (req, res, next) => {
        try {
            const { status, motoristaId, createdDe, createdAte } = req.query;

            const parsedPage = Number(req.query.page);
            const parsedLimit = Number(req.query.limit);

            const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
            const limitValue = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;
            const limit = Math.min(limitValue, 50);

            const createdDeDate = createdDe ? new Date(createdDe) : null;
            const createdAteDate = createdAte ? new Date(createdAte) : null;

            if (createdDe && Number.isNaN(createdDeDate?.getTime())) {
                throw new AppError("Parametro createdDe invalido. Use ISO 8601", 400);
            }

            if (createdAte && Number.isNaN(createdAteDate?.getTime())) {
                throw new AppError("Parametro createdAte invalido. Use ISO 8601", 400);
            }

            if (createdAteDate && !String(createdAte).includes("T")) {
                createdAteDate.setHours(23, 59, 59, 999);
            }

            if (motoristaId !== undefined && Number.isNaN(Number(motoristaId))) {
                throw new AppError("Parametro motoristaId invalido", 400);
            }

            const filtros = {
                ...(status ? { status } : {}),
                ...(motoristaId !== undefined ? { motoristaId: Number(motoristaId) } : {}),
                ...(createdDeDate ? { createdDe: createdDeDate } : {}),
                ...(createdAteDate ? { createdAte: createdAteDate } : {})
            };

            const [totalData, data] = await Promise.all([
                this.service.listarEntregas(filtros),
                this.service.listarEntregas({ ...filtros, page, limit })
            ]);

            const total = totalData.length;
            const totalPages = Math.max(1, Math.ceil(total / limit));

            res.json({
                data,
                total,
                page,
                limit,
                totalPages
            });
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