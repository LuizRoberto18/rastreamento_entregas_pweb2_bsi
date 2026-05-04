import { AppError } from "../../utils/AppError.js";

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

export class PainelMotoristasController {
  constructor(motoristasService) {
    this.motoristasService = motoristasService;
  }

  listarMotoristas = async (req, res, next) => {
    try {
      const motoristas = await this.motoristasService.listarMotoristas();
      const flash = buildFlash(req.query);

      return renderWithLayout(res, next, "motoristas/index", {
        pageTitle: "Motoristas",
        currentPath: req.path,
        flash,
        motoristas
      });
    } catch (err) {
      next(err);
    }
  };

  exibirNovoMotorista = async (req, res, next) => {
    try {
      const flash = buildFlash(req.query);

      return renderWithLayout(res, next, "motoristas/novo", {
        pageTitle: "Novo motorista",
        currentPath: req.path,
        flash,
        errors: [],
        formValues: {
          nome: "",
          cpf: "",
          placaVeiculo: ""
        }
      });
    } catch (err) {
      next(err);
    }
  };

  criarMotorista = async (req, res, next) => {
    try {
      const { nome, cpf, placaVeiculo } = req.body;

      await this.motoristasService.criarMotorista({
        nome,
        cpf,
        placaVeiculo
      });

      return res.redirect(
        `/painel/motoristas?sucesso=${encodeURIComponent("Motorista cadastrado com sucesso")}`
      );
    } catch (err) {
      if (err instanceof AppError) {
        return renderWithLayout(res.status(err.statusCode || 400), next, "motoristas/novo", {
          pageTitle: "Novo motorista",
          currentPath: req.path,
          flash: buildFlash(req.query),
          errors: [err.message],
          formValues: {
            nome: req.body.nome || "",
            cpf: req.body.cpf || "",
            placaVeiculo: req.body.placaVeiculo || ""
          }
        });
      }

      return next(err);
    }
  };

  ativarMotorista = async (req, res, next) => {
    try {
      await this.motoristasService.atualizarStatus(req.params.id, "ATIVO");
      return res.redirect(
        `/painel/motoristas?sucesso=${encodeURIComponent("Motorista ativado com sucesso")}`
      );
    } catch (err) {
      return next(err);
    }
  };

  inativarMotorista = async (req, res, next) => {
    try {
      await this.motoristasService.atualizarStatus(req.params.id, "INATIVO");
      return res.redirect(
        `/painel/motoristas?sucesso=${encodeURIComponent("Motorista inativado com sucesso")}`
      );
    } catch (err) {
      return next(err);
    }
  };
}
