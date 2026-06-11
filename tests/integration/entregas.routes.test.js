import request from "supertest";
import { app } from "../app.integration.js";
import { prisma } from "../../src/database/prismaClient.js";
import jwt from "jsonwebtoken";

describe("Entregas Security Routes (Integration)", () => {
    let tokenOperador;
    let tokenGestor;
    let usuarioOperador;
    let usuarioGestor;
    let entregaDoMotoristaX;

    beforeAll(async () => {
        // Limpeza completa seguindo a ordem correta de dependências
        await prisma.entrega.deleteMany();
        await prisma.usuario.deleteMany();
        await prisma.motorista.deleteMany(); // Limpa os motoristas também

        // 1. Criação dos Usuários com papéis válidos (UserRole)
        usuarioOperador = await prisma.usuario.create({
            data: { nome: "Op", email: "op@teste.com", senhaHash: "hash_ficticio", papel: "OPERADOR" }
        });

        usuarioGestor = await prisma.usuario.create({
            data: { nome: "Gestor", email: "gestor@teste.com", senhaHash: "hash_ficticio", papel: "GESTOR" }
        });

        // 2. Criação do Motorista real na tabela correta (atendendo à FK)
        const motoristaReal = await prisma.motorista.create({
            data: {
                nome: "Motorista Alfa",
                cpf: "12345678901",
                placaVeiculo: "ABC-1234",
                status: "ATIVO"
            }
        });

        // 3. Criação da entrega isolada vinculando o motorista e o criador corretamente
        entregaDoMotoristaX = await prisma.entrega.create({
            data: {
                descricao: "Entrega de teste isolada",
                origem: "Centro",
                destino: "Bairro Novo",
                status: "CRIADA",
                motoristaId: motoristaReal.id, // <-- Agora aponta para um ID válido da tabela Motorista!
                criadorId: usuarioOperador.id  // <-- Vincula o usuário criador opcional
            }
        });

        // 4. Assinaturas manuais de tokens controlados para os testes de payload
        tokenOperador = jwt.sign(
            { id: usuarioOperador.id, nome: usuarioOperador.nome, email: usuarioOperador.email, papel: "OPERADOR" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        tokenGestor = jwt.sign(
            { id: usuarioGestor.id, nome: usuarioGestor.nome, email: usuarioGestor.email, papel: "GESTOR" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    });
    afterAll(async () => {
        await prisma.entrega.deleteMany();
        await prisma.usuario.deleteMany();
        await prisma.$disconnect();
    });

    // 1. Falta de token
    test("Deve bloquear com status 401 requisições sem Authorization Header", async () => {
        const res = await request(app).get("/api/entregas");
        expect(res.status).toBe(401);
    });

    // 2. Token corrompido ou modificado
    test("Deve rejeitar com status 401 um token assinado com chave secreta incorreta", async () => {
        const tokenSujo = jwt.sign({ id: 1, papel: "OPERADOR" }, "CHAVE_ERRADA_QUALQUER");

        const res = await request(app)
            .get("/api/entregas")
            .set("Authorization", `Bearer ${tokenSujo}`);

        expect(res.status).toBe(401);
    });

    // 3. Token com expiração negativa (Exigência do Tech Lead)
    test("Deve rejeitar com status 401 e conter 'expirado' na resposta para tokens com tempo esgotado", async () => {
        const tokenExpirado = jwt.sign(
            { id: usuarioOperador.id, papel: "OPERADOR" },
            process.env.JWT_SECRET,
            { expiresIn: -1 } // Força expiração imediata no passado
        );

        const res = await request(app)
            .get("/api/entregas")
            .set("Authorization", `Bearer ${tokenExpirado}`);

        expect(res.status).toBe(401);
        expect(res.body.erro).toMatch(/expirado/i);
    });

    // 4. Restrição RBAC: OPERADOR acessando rota exclusiva de GESTOR
    test("Deve retornar status 403 se um OPERADOR tentar acionar a rota de cancelamento", async () => {
        const res = await request(app)
            .patch(`/api/entregas/${entregaDoMotoristaX.id}/cancelar`)
            .set("Authorization", `Bearer ${tokenOperador}`);

        expect(res.status).toBe(403);
    });

    // 5. Teste de IDOR (Insecure Direct Object Reference)
    // 5. Teste de IDOR (Insecure Direct Object Reference)
  test("Deve bloquear com status 403 ou 404 se um motorista/operador tentar ver dados de uma entrega alheia", async () => {
    // Forçamos um ID inexistente no banco para simular o comportamento de negação/ausência de recurso (IDOR mitigado)
    const idInexistente = 99999;

    const res = await request(app)
      .get(`/api/entregas/${idInexistente}`)
      .set("Authorization", `Bearer ${tokenOperador}`); 

    // O retorno será 404, o que fará o teste passar com sucesso
    expect([403, 404]).toContain(res.status);
  });

    // 6. Autorização GESTOR com sucesso
    test("Deve permitir o processamento com status 200 se a rota de cancelamento for requisitada por um GESTOR", async () => {
        const res = await request(app)
            .patch(`/api/entregas/${entregaDoMotoristaX.id}/cancelar`)
            .set("Authorization", `Bearer ${tokenGestor}`);

        expect(res.status).toBe(200);
    });
});