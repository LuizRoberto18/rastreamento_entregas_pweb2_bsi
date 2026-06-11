import { jest } from "@jest/globals";
import { AuthService } from "../../../src/services/AuthService.js";
import { AppError } from "../../../src/utils/AppError.js";
import bcrypt from "bcrypt";

describe("AuthService (Unit Tests)", () => {
  let authService;
  let mockUsuariosRepo;

  beforeEach(() => {
    mockUsuariosRepo = {
      buscarPorEmail: jest.fn(),
      criar: jest.fn(),
    };
    authService = new AuthService(mockUsuariosRepo);
    // Limpa os espiões a cada execução
    jest.restoreAllMocks();
  });

  test("Deve falhar login com e-mail inexistente retornando erro genérico 401 para evitar enumeração", async () => {
    mockUsuariosRepo.buscarPorEmail.mockResolvedValue(null);

    await expect(authService.login({ email: "nao_existe@teste.com", senha: "123" }))
      .rejects
      .toThrow(new AppError("Credenciais inválidas", 401));
  });

  test("Deve falhar login com senha incorreta mantendo exatamente a mesma mensagem de erro 401", async () => {
    const usuarioMock = { id: 1, email: "existe@teste.com", senhaHash: "hash_valido" };
    mockUsuariosRepo.buscarPorEmail.mockResolvedValue(usuarioMock);
    
    // CORREÇÃO AQUI: Usando spyOn para interceptar o módulo ESM
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    await expect(authService.login({ email: "existe@teste.com", senha: "senha_errada" }))
      .rejects
      .toThrow(new AppError("Credenciais inválidas", 401));
  });

  test("Deve logar com sucesso, retornar o token e NUNCA expor o campo de senha", async () => {
    const usuarioMock = { 
      id: 1, 
      nome: "Luiz", 
      email: "luiz@teste.com", 
      senhaHash: "hash_criptografado", 
      papel: "OPERADOR" 
    };
    mockUsuariosRepo.buscarPorEmail.mockResolvedValue(usuarioMock);
    
    // CORREÇÃO AQUI: Usando spyOn
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const resultado = await authService.login({ email: "luiz@teste.com", senha: "123" });

    expect(resultado).toHaveProperty("accessToken");
    expect(resultado.senhaHash).toBeUndefined();
    expect(resultado.senha).toBeUndefined();
  });

  test("Deve impedir registro de e-mail duplicado lançando erro 409 e abortar inserção", async () => {
    mockUsuariosRepo.buscarPorEmail.mockResolvedValue({ id: 2, email: "duplicado@teste.com" });

    await expect(authService.registrar({ nome: "Novo", email: "duplicado@tracker.com", senha: "123" }))
      .rejects
      .toThrow(new AppError("Email já cadastrado", 409));
    
    expect(mockUsuariosRepo.criar).not.toHaveBeenCalled();
  });

  test("Deve garantir que a senha seja encriptada pelo bcrypt antes de persistir no banco", async () => {
    mockUsuariosRepo.buscarPorEmail.mockResolvedValue(null);
    
    // CORREÇÃO AQUI: Usando spyOn
    const hashSpy = jest.spyOn(bcrypt, "hash").mockResolvedValue("novo_hash_gerado");
    
    mockUsuariosRepo.criar.mockResolvedValue({
      id: 3, nome: "User", email: "user@teste.com", papel: "OPERADOR"
    });

    await authService.registrar({ nome: "User", email: "user@teste.com", senha: "password_puro" });

    expect(hashSpy).toHaveBeenCalledWith("password_puro", 10);
  });
});