import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(usuariosRepository) {
    this.usuariosRepository = usuariosRepository;
  }

  async registrar({ nome, email, senha, papel = "OPERADOR" }) {
    if (!nome || !email || !senha) {
      throw new AppError("Nome, email e senha são obrigatórios", 400);
    }

    const existente = await this.usuariosRepository.buscarPorEmail(email);
    if (existente) {
      throw new AppError("Email já cadastrado", 409); // Cenário de e-mail duplicado
    }

    // Criptografia
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await this.usuariosRepository.criar({
      nome,
      email,
      senhaHash,
      papel
    });

    // Retorna exclusivamente dados não sensíveis
    return { 
      id: usuario.id, 
      nome: usuario.nome, 
      email: usuario.email, 
      papel: usuario.papel 
    };
  }

  async login({ email, senha }) {
    if (!email || !senha) {
      throw new AppError("Email e senha são obrigatórios", 400);
    }

    const usuario = await this.usuariosRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaValida) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const payload = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      papel: usuario.papel
    };

    // Assinatura do token configurável via ambiente externo
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "8h"
    });

    return { ...payload, accessToken };
  }
}