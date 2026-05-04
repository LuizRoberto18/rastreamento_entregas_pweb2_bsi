function renderWithLayout(res, next, view, data) {
  res.render(view, data, (err, html) => {
    if (err) {
      return next(err);
    }

    return res.render("layouts/base", { ...data, body: html });
  });
}

function buildFlash(query) {
  return {
    sucesso: typeof query.sucesso === "string" ? query.sucesso : null,
    erro: typeof query.erro === "string" ? query.erro : null
  };
}

export class PainelRelatoriosController {
  constructor(relatoriosRepository) {
    this.relatoriosRepository = relatoriosRepository;
  }

  exibirRelatorios = async (req, res, next) => {
    try {
      const [entregasPorStatus, motoristasAtivos] = await Promise.all([
        this.relatoriosRepository.entregasPorStatus(),
        this.relatoriosRepository.motoristasAtivosComEntregasEmAberto()
      ]);

      return renderWithLayout(res, next, "relatorios/index", {
        pageTitle: "Relatorios",
        currentPath: req.path,
        flash: buildFlash(req.query),
        entregasPorStatus,
        motoristasAtivos
      });
    } catch (err) {
      return next(err);
    }
  };
}
