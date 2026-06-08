export function autorizar(...papeis) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    if (!papeis.includes(req.usuario.papel)) {
      return res.status(403).json({ erro: "Acesso negado" });
    }

    next();
  };
}
