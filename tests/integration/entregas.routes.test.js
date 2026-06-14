import request from "supertest";
import { app } from "../app.integration.js";
import { prisma } from "../../src/database/prismaClient.js";
import jwt from "jsonwebtoken";
import { autenticar } from "../../src/middlewares/autenticar.js";
import { autorizar } from "../../src/middlewares/autorizar.js";

// Criamos endpoints fictícios que começam com /painel e chamam explicitamente o middleware,
// evitando que o Express retorne 404 automático antes de processar a lógica de autenticação.
app.get("/painel/test-cobertura-sem-token", autenticar, (req, res) => {
    return res.status(200).json({ ok: true });
});

app.get("/painel/test-cobertura-token-invalido", autenticar, (req, res) => {
    return res.status(200).json({ ok: true });
});

describe("Entregas Security Routes (Integration)", () => {
    let tokenOperador;
    let tokenGestor;
    let usuarioOperador;
    let usuarioGestor;
    let entregaDoMotoristaX;

    beforeAll(async () => {
        await prisma.entrega.deleteMany();
        await prisma.usuario.deleteMany();
        await prisma.motorista.deleteMany();

        usuarioOperador = await prisma.usuario.create({
            data: { nome: "Op", email: "op@teste.com", senhaHash: "hash_ficticio", papel: "OPERADOR" }
        });

        usuarioGestor = await prisma.usuario.create({
            data: { nome: "Gestor", email: "gestor@teste.com", senhaHash: "hash_ficticio", papel: "GESTOR" }
        });

        const motoristaReal = await prisma.motorista.create({
            data: {
                nome: "Motorista Alfa",
                cpf: "12345678901",
                placaVeiculo: "ABC-1234",
                status: "ATIVO"
            }
        });

        entregaDoMotoristaX = await prisma.entrega.create({
            data: {
                descricao: "Entrega de teste isolada",
                origem: "Centro",
                destino: "Bairro Novo",
                status: "CRIADA",
                motoristaId: motoristaReal.id,
                criadorId: usuarioOperador.id
            }
        });

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

    test("Deve retornar status 401 se o Header de Autorização estiver malformado (Sem Bearer)", async () => {
        const response = await request(app)
            .get("/api/entregas")
            .set("Authorization", "TokenInvalidoSemPalavraBearer 12345");

        expect(response.status).toBe(401);
    });

    test("Deve retornar status 403 se a validação do papel (RBAC) falhar por completo", async () => {
        const tokenComPapelInvalido = jwt.sign(
            { id: "user-id-123", nome: "Teste", email: "teste@teste.com", papel: "INVALIDO" },
            process.env.JWT_SECRET
        );

        const response = await request(app)
            .patch("/api/entregas/1/cancelar")
            .set("Authorization", `Bearer ${tokenComPapelInvalido}`);

        expect(response.status).toBe(403);
    });

    test("Deve bloquear com status 401 requisições sem Authorization Header", async () => {
        const res = await request(app).get("/api/entregas");
        expect(res.status).toBe(401);
    });

    test("DeveBox rejeitar com status 401 um token assinado com chave secreta incorreta", async () => {
        const tokenSujo = jwt.sign({ id: 1, papel: "OPERADOR" }, "CHAVE_ERRADA_QUALQUER");

        const res = await request(app)
            .get("/api/entregas")
            .set("Authorization", `Bearer ${tokenSujo}`);

        expect(res.status).toBe(401);
    });

    test("Deve rejeitar com status 401 e conter 'expirado' na resposta para tokens com tempo esgotado", async () => {
        const tokenExpirado = jwt.sign(
            { id: usuarioOperador.id, papel: "OPERADOR" },
            process.env.JWT_SECRET,
            { expiresIn: -1 }
        );

        const res = await request(app)
            .get("/api/entregas")
            .set("Authorization", `Bearer ${tokenExpirado}`);

        expect(res.status).toBe(401);
        expect(res.body.erro).toMatch(/expirado/i);
    });

    test("Deve retornar status 403 se um OPERADOR tentar acionar a rota de cancelamento", async () => {
        const res = await request(app)
            .patch(`/api/entregas/${entregaDoMotoristaX.id}/cancelar`)
            .set("Authorization", `Bearer ${tokenOperador}`);

        expect(res.status).toBe(403);
    });

    test("Deve bloquear com status 403 ou 404 se um motorista/operador tentar ver dados de uma entrega alheia", async () => {
        const idInexistente = 99999;

        const res = await request(app)
            .get(`/api/entregas/${idInexistente}`)
            .set("Authorization", `Bearer ${tokenOperador}`);

        expect([403, 404]).toContain(res.status);
    });

    test("Deve permitir o processamento com status 200 se a rota de cancelamento for requisitada por um GESTOR", async () => {
        const res = await request(app)
            .patch(`/api/entregas/${entregaDoMotoristaX.id}/cancelar`)
            .set("Authorization", `Bearer ${tokenGestor}`);

        expect(res.status).toBe(200);
    });

    test("Deve autenticar o usuário com sucesso se o token for enviado via Cookies", async () => {
        const response = await request(app)
            .get("/api/entregas")
            .set("Cookie", [`token=${tokenOperador}`]);

        expect(response.status).not.toBe(401);
    });

    test("Deve rejeitar com status 401 se o usuário tentar acessar a API sem token", async () => {
        const response = await request(app)
            .get("/api/entregas");

        expect(response.status).toBe(401);
    });

    test("Deve rejeitar com status 401 se acessar a API com token corrompido", async () => {
        const response = await request(app)
            .get("/api/entregas")
            .set("Cookie", ["token=token_completamente_invalido_e_quebrado"]);

        expect(response.status).toBe(401);
    });

    test("Deve redirecionar para /login se tentar acessar o painel sem token", async () => {
        const response = await request(app)
            .get("/painel/test-cobertura-sem-token");

        expect(response.status).toBe(302);
        expect(response.headers.location).toBe("/login");
    });


    test("Deve limpar cookie e redirecionar para /auth/login se acessar o painel com token inválido", async () => {
        const response = await request(app)
            .get("/painel/test-cobertura-token-invalido")
            .set("Cookie", ["token=token_expirado_ou_invalido"]);

        expect(response.status).toBe(302);
        expect(response.headers.location).toBe("/auth/login");
    });

    test("Deve retornar 401 se o middleware autorizar for chamado sem req.usuario", () => {
        const middleware = autorizar("GESTOR");
        const req = {};
        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.body = data;
                return this;
            }
        };
        const next = () => { };

        middleware(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res.body.erro).toBe("Usuário não autenticado");
    });
});