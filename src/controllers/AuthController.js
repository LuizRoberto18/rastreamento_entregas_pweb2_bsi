export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async registrar(req, res, next) {
    try {
      const { nome, email, senha, papel } = req.body;
      const usuario = await this.authService.registrar({ nome, email, senha, papel });
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const resultado = await this.authService.login({ email, senha });
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }
}
