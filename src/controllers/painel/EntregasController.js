import { AppError } from "../../utils/AppError.js";

const STATUS_OPTIONS = ["CRIADA", "EM_TRANSITO", "ENTREGUE", "CANCELADA"];

function buildFlash(query) {
  return {
    sucesso: typeof query.sucesso === "string" ? query.sucesso : null,
    erro: typeof query.erro === "string" ? query.erro : null
  };
}

function renderWithLayout(res, next, view, data) {
  res.render(view, data, (err, html) => {
    if (err) {
      return next(err);
    }

    return res.render("layouts/base", { ...data, body: html });
  });
}

export class PainelEntregasController {
  constructor(entregasService, motoristasService) {
    this.entregasService = entregasService;
    this.motoristasService = motoristasService;
  }

  listarEntregas = async (req, res, next) => {
    try {
      const status = typeof req.query.status === "string" ? req.query.status : "";
      const parsedPage = Number(req.query.page);
      const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
      const limit = 10;

      const filtros = status ? { status } : {};

      const [totalData, entregas, motoristas] = await Promise.all([
        this.entregasService.listarEntregas(filtros),
        this.entregasService.listarEntregas({ ...filtros, page, limit }),
        this.motoristasService.listarMotoristas()
      ]);

      const total = totalData.length;
      const totalPages = Math.max(1, Math.ceil(total / limit));

      const motoristaMap = new Map(motoristas.map((motorista) => [motorista.id, motorista]));

      const entregasView = entregas.map((entrega) => ({
        ...entrega,
        motoristaNome: entrega.motoristaId
          ? motoristaMap.get(entrega.motoristaId)?.nome || "Nao informado"
          : "Sem motorista",
        createdAt: entrega.historico?.[0]?.data || null
      }));

      const flash = buildFlash(req.query);

      return renderWithLayout(res, next, "entregas/index", {
        pageTitle: "Entregas",
        currentPath: req.path,
        entregas: entregasView,
        statusSelecionado: status,
        statusOptions: STATUS_OPTIONS,
        page,
        totalPages,
        flash
      });
    } catch (err) {
      next(err);
    }
  };

  exibirNovaEntrega = async (req, res, next) => {
    try {
      const flash = buildFlash(req.query);

      return renderWithLayout(res, next, "entregas/nova", {
        pageTitle: "Nova entrega",
        currentPath: req.path,
        flash,
        errors: [],
        formValues: {
          descricao: "",
          origem: "",
          destino: ""
        }
      });
    } catch (err) {
      next(err);
    }
  };

  criarEntrega = async (req, res, next) => {
    try {
      const { descricao, origem, destino } = req.body;

      await this.entregasService.criarEntrega({
        descricao,
        origem,
        destino
      });

      return res.redirect(`/painel/entregas?sucesso=${encodeURIComponent("Entrega criada com sucesso")}`);
    } catch (err) {
      if (err instanceof AppError) {
        return renderWithLayout(res.status(err.statusCode || 400), next, "entregas/nova", {
          pageTitle: "Nova entrega",
          currentPath: req.path,
          flash: buildFlash(req.query),
          errors: [err.message],
          formValues: {
            descricao: req.body.descricao || "",
            origem: req.body.origem || "",
            destino: req.body.destino || ""
          }
        });
      }

      return next(err);
    }
  };

  detalharEntrega = async (req, res, next) => {
    try {
      const [entrega, motoristas] = await Promise.all([
        this.entregasService.buscarPorId(req.params.id),
        this.motoristasService.listarMotoristas()
      ]);
      const flash = buildFlash(req.query);

      let motorista = null;
      if (entrega.motoristaId) {
        try {
          motorista = await this.motoristasService.buscarPorId(entrega.motoristaId);
        } catch (err) {
          motorista = null;
        }
      }

      const historico = Array.isArray(entrega.historico) ? entrega.historico : [];
      const motoristasAtivos = motoristas.filter((item) => item.status === "ATIVO");

      return renderWithLayout(res, next, "entregas/detalhe", {
        pageTitle: "Detalhe da entrega",
        currentPath: req.path,
        flash,
        entrega,
        motorista,
        historico,
        motoristas: motoristasAtivos
      });
    } catch (err) {
      next(err);
    }
  };

  atribuirMotorista = async (req, res, next) => {
    try {
      const { motoristaId } = req.body;

      await this.entregasService.atribuirMotorista(req.params.id, motoristaId);
      return res.redirect(
        `/painel/entregas/${req.params.id}?sucesso=${encodeURIComponent("Motorista atribuido com sucesso")}`
      );
    } catch (err) {
      if (err instanceof AppError) {
        return res.redirect(`/painel/entregas/${req.params.id}?erro=${encodeURIComponent(err.message)}`);
      }

      return next(err);
    }
  };

  avancarEntrega = async (req, res, next) => {
    try {
      await this.entregasService.avancarEntrega(req.params.id);
      return res.redirect(
        `/painel/entregas/${req.params.id}?sucesso=${encodeURIComponent("Status atualizado com sucesso")}`
      );
    } catch (err) {
      if (err instanceof AppError) {
        return res.redirect(`/painel/entregas/${req.params.id}?erro=${encodeURIComponent(err.message)}`);
      }

      return next(err);
    }
  };

  cancelarEntrega = async (req, res, next) => {
    try {
      await this.entregasService.cancelarEntrega(req.params.id);
      return res.redirect(
        `/painel/entregas/${req.params.id}?sucesso=${encodeURIComponent("Entrega cancelada com sucesso")}`
      );
    } catch (err) {
      if (err instanceof AppError) {
        return res.redirect(`/painel/entregas/${req.params.id}?erro=${encodeURIComponent(err.message)}`);
      }

      return next(err);
    }
  };
}
