import jwt from "jsonwebtoken";

export function autenticar(req, res, next) {
  let token = null;

  // Busca prioritária nos cookies
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

  // --- ALTERAÇÃO AQUI: Lista de rotas que devem redirecionar para a tela de login se não houver token ---
  const ehRotaWeb = req.originalUrl.startsWith("/painel") || req.originalUrl.startsWith("/entregas");

  // Se nenhum token for encontrado
  if (!token) {
    if (ehRotaWeb) {
      return res.redirect("/login");
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
    // Se o token for inválido/expirado e ele estiver navegando nas telas web
    if (ehRotaWeb) {
      res.clearCookie("token");
      return res.redirect("/login"); // Mantido /login para corresponder ao que o Playwright espera
    }
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}