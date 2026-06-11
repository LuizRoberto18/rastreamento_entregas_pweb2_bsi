import jwt from "jsonwebtoken";

export function autenticar(req, res, next) {
  let token = null;

  // Busca prioritária
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } 
  // Fallback: Cabeçalho Authorization
  else if (req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  // Se nenhum token for encontrado
  if (!token) {
    // Se o usuário tentar acessar o painel web, redirecione para o Login 
    if (req.originalUrl.startsWith("/painel")) {
      return res.redirect("/auth/login");
    }
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    req.usuario = {
      id: payload.id,
      nome: payload.nome,
      email: payload.email,
      papel: payload.papel
    };

    return next();
  } catch (err) {
    // Se o token for inválido/expirado e ele estiver navegando no painel, limpa o cookie e joga pro login
    if (req.originalUrl.startsWith("/painel")) {
      res.clearCookie("token");
      return res.redirect("/auth/login");
    }
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}