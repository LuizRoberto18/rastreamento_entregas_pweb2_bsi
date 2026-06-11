import request from "supertest";
import { app } from "../app.integration.js";
import { prisma } from "../../src/database/prismaClient.js"; // Ajuste o caminho até o seu cliente Prisma

describe("Auth Routes (Integration)", () => {
  
  // Limpeza obrigatória do banco de testes antes de cada caso para evitar conflito de chaves duplicadas
  beforeEach(async () => {
    // Apaga tokens antes para não violar restrições de FK
    if (prisma.refreshToken) {
      await prisma.refreshToken.deleteMany();
    }
    await prisma.usuario.deleteMany();
  });

  // Encerra conexões abertas do Prisma após o término da suíte
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // 1. Registro válido
  test("POST /api/auth/registrar com dados válidos deve responder 201 e omitir campos de senha", async () => {
    const res = await request(app)
      .post("/api/auth/registrar")
      .send({
        nome: "Luiz Operador",
        email: "luiz@tracker.com",
        senha: "senha_longa_e_valida_123",
        papel: "OPERADOR"
      });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("luiz@tracker.com");
    expect(res.body.senhaHash).toBeUndefined();
    expect(res.body.senha).toBeUndefined();
  });

  // 2. Registro com senha curta (< 8 caracteres)
  test("POST /api/auth/registrar deve falhar com status 400 se a senha for curta", async () => {
    const res = await request(app)
      .post("/api/auth/registrar")
      .send({
        nome: "Luiz",
        email: "curta@tracker.com",
        senha: "123",
        papel: "OPERADOR"
      });

    expect(res.status).toBe(400);
  });

  // 3. Registro com e-mail duplicado
  test("POST /api/auth/registrar deve falhar com status 409 se o email já estiver cadastrado", async () => {
    const payload = {
      nome: "Original",
      email: "duplicado@tracker.com",
      senha: "senha_valida_123"
    };

    // Primeiro cadastro
    await request(app).post("/api/auth/registrar").send(payload);

    // Tentativa de duplicar
    const res = await request(app).post("/api/auth/registrar").send({
      nome: "Clone",
      email: "duplicado@tracker.com",
      senha: "outra_senha_valida"
    });

    expect(res.status).toBe(409);
  });

  // 4. Login com credenciais corretas
  test("POST /api/auth/login deve responder 200 e fornecer o accessToken", async () => {
    await request(app).post("/api/auth/registrar").send({
      nome: "User Teste",
      email: "login_sucesso@tracker.com",
      senha: "password_valido"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "login_sucesso@tracker.com", senha: "password_valido" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  // 5. Login com senha errada
  test("POST /api/auth/login deve falhar com 401 e exibir 'Credenciais inválidas' para senha incorreta", async () => {
    await request(app).post("/api/auth/registrar").send({
      nome: "User Teste",
      email: "senha_errada@tracker.com",
      senha: "password_correto"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "senha_errada@tracker.com", senha: "senha_incorreta_digitada" });

    expect(res.status).toBe(401);
    expect(res.body.erro).toMatch(/credenciais inválidas/i);
  });

  // 6. Login com email que não existe
  test("POST /api/auth/login deve manter estritamente o erro 401 para email inexistente", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "inexistente_de_verdade@tracker.com", senha: "qualquer_coisa" });

    expect(res.status).toBe(401);
    expect(res.body.erro).toMatch(/credenciais inválidas/i);
  });
});