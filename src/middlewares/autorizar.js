export function autorizar(...papeis) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    // validação estrita em memória usando o req.usuario injetado
    if (!papeis.includes(req.usuario.papel)) {
      return res.status(403).json({ erro: "Acesso negado" });
    }

    return next();
  };
}