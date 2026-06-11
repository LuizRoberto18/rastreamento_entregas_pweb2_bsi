export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async registrar(req, res, next) {
    try {
      const { nome, email, senha, papel } = req.body;
      const usuario = await this.authService.registrar({ nome, email, senha, papel });
      
      const isFormSubmit = req.headers["content-type"]?.includes("application/x-www-form-urlencoded");
      if (isFormSubmit) {
        return res.redirect("/auth/login?sucesso=cadastrado");
      }

      return res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }


async login(req, res, next) {
  try {
    const { email, senha } = req.body;
    
    // Service faz a validação e gera o objeto original: { id, nome, email, papel, accessToken }
    const resultado = await this.authService.login({ email, senha });
    
    // Injeta o Cookie 
    res.cookie("token", resultado.accessToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax", 
      maxAge: 8 * 60 * 60 * 1000 // 8 horas
    });

    // Verifica se o envio veio de um formulário HTML
    const isFormSubmit = req.headers["content-type"]?.includes("application/x-www-form-urlencoded");
    if (isFormSubmit) {
      return res.redirect("/painel/entregas");
    }

    //  Devolve exatamente o objeto bruto do Service
    return res.status(200).json(resultado);

  } catch (error) {
    next(error);
  }
}
}