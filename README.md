# rastreamento_entregas_pweb2_bsi

API de rastreamento de entregas com arquitetura Controller -> Service -> Repository,
persistencia SQL (PostgreSQL ou SQLite local) e composicao de dependencias em ponto unico.

## Atividade 07 (SQL simples, sem ORM)

Foi adicionado um esqueleto para migrar persistencia para SQL simples,
sem alterar a arquitetura principal (Controller -> Service -> Repository).

Objetivo de implementacao:
- manter services/controllers
- trocar apenas repository por implementacao SQL
- manter camadas desacopladas

Arquivos-base criados:

- `migration.sql`
- `.env.example`
- `src/database/pgPool.js` (conexao; queries continuam em SQL puro)
- `src/repositories/sql/EntregasPgRepository.js`
- `src/repositories/sql/MotoristasPgRepository.js`
- `src/repositories/sql/RelatoriosPgRepository.js`
- `src/controllers/RelatoriosController.js`
- `src/routes/RelatoriosRoutes.js`

Pontos de integracao comentados:

- `src/routes/index.js` (troca de repository no ponto de composicao)
- `src/server.js` (variaveis de ambiente)
- fallback local com SQLite quando `DATABASE_URL` nao estiver definida

Checklist para concluir a atividade:

1. Implementar `createPgPool` com `DATABASE_URL`.
2. Implementar queries SQL dos repositories em `src/repositories/sql`.
3. Trocar composicao em `src/routes/index.js` para usar repositories SQL.
4. Registrar `createRelatoriosRouter` em `/api/relatorios`.
5. Garantir tratamento de erro `23505` (UNIQUE CPF) como `AppError(409)`.
6. Executar `migration.sql` em banco vazio e validar idempotencia.

## Atividade 07 - Guia ponto a ponto (iniciante)

### Ponto 1 - Modelagem do Banco (RF-01)

Onde fazer:
- `migration.sql`

Passo a passo:
1. Confirmar que existem as tabelas `motoristas`, `entregas`, `eventos_entrega`.
2. Confirmar FK em `eventos_entrega.entrega_id` com `ON DELETE CASCADE`.
3. Garantir `NOT NULL` para campos obrigatorios do dominio.
4. Garantir status com `CHECK` (versao escolhida nesta atividade).

### Ponto 2 - Migration Manual (RF-02)

Onde fazer:
- `migration.sql`

Passo a passo:
1. Usar `CREATE TABLE IF NOT EXISTS` em todas as tabelas.
2. Usar `CREATE INDEX IF NOT EXISTS` nos indices.
3. Rodar a migration duas vezes para validar idempotencia.

### Ponto 3 - Repositories com SQL simples (RF-03)

Onde fazer:
- `src/database/pgPool.js`
- `src/repositories/sql/EntregasPgRepository.js`
- `src/repositories/sql/MotoristasPgRepository.js`
- `src/routes/index.js` (composicao)

Passo a passo:
1. Implementar conexao SQL em `pgPool.js` usando `DATABASE_URL`.
2. Implementar queries SQL em `EntregasPgRepository` e `MotoristasPgRepository`.
3. Em `routes/index.js`, trocar repositories em memoria pelos SQL.
4. Nao alterar `EntregasService` nem `MotoristasService`.

### Ponto 4 - Tratamento de Erros do Banco (RF-04)

Onde fazer:
- `src/repositories/sql/MotoristasPgRepository.js`
- `src/repositories/sql/EntregasPgRepository.js`

Passo a passo:
1. Capturar erro de banco `23505` no `criar` de motorista.
2. Relancar como `AppError` com status `409`.
3. Em `buscarPorId`/`buscarPorCPF`, retornar `null` quando nao encontrar.

### Ponto 5 - Relatorios agregados (RF-05)

Onde fazer:
- `src/repositories/sql/RelatoriosPgRepository.js`
- `src/controllers/RelatoriosController.js`
- `src/routes/RelatoriosRoutes.js`
- `src/routes/index.js`

Passo a passo:
1. Implementar query `GROUP BY` para entregas por status.
2. Implementar query com `JOIN + GROUP BY` para motoristas com entregas em aberto.
3. Implementar controller chamando repository e retornando JSON.
4. Registrar `router.use("/relatorios", ...)` em `routes/index.js`.

### Ponto 6 - Variaveis de ambiente

Onde fazer:
- `.env.example`
- `src/server.js`
- `src/database/pgPool.js`

Passo a passo:
1. Preencher `DATABASE_URL` no `.env` local (base no `.env.example`).
2. Se nao usar PostgreSQL, configurar `SQLITE_PATH` no `.env` local.
3. Garantir que a aplicacao leia as variaveis antes da composicao.
4. Usar `process.env.PORT || 3000` para porta.

### Ponto 7 - Cenarios de teste esperados

Onde validar:
- `testes.http` (ou client HTTP de sua preferencia)

Passo a passo:
1. Criar dados, reiniciar servidor e confirmar persistencia.
2. Testar CPF duplicado e validar `409`.
3. Testar os dois endpoints de relatorio e conferir formato de resposta.

### Ponto 8 - Entregavel final

Checklist final:
1. `migration.sql` funcional.
2. Repositories SQL implementados.
3. `.env.example` presente.
4. Services sem alteracoes de codigo.

## Autor

- Nome: LuizRoberto18
- E-mail: luiz.roberto20@yahoo.com

## Tecnologias

- Node.js
- Express
- JSDoc 3

## Execucao

### Pre-requisitos

- Node.js 18+
- npm

### Passos

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar servidor:

```bash
node src/server.js
```

3. Base URL:

```text
http://localhost:3000/api
```

## Rotas de Entregas (mantidas)

- `POST /api/entregas`
- `GET /api/entregas`
- `GET /api/entregas/:id`
- `PATCH /api/entregas/:id/avancar`
- `PATCH /api/entregas/:id/cancelar`
- `GET /api/entregas/:id/historico`

## Novas Rotas de Motoristas

- `POST /api/motoristas`
- `GET /api/motoristas`
- `GET /api/motoristas/:id`
- `GET /api/motoristas/:id/entregas`
- `PATCH /api/entregas/:id/atribuir` (body: `{ "motoristaId": number }`)

## Regras de Negocio Novas

- Cadastro de motorista com `status: "ATIVO"` por padrao.
- CPF deve ser unico. CPF duplicado retorna `409 Conflict`.
- Atribuicao de motorista so permitida para entrega com status `CRIADA`.
- Motorista com status `INATIVO` nao pode ser atribuido (`422`).
- Nova atribuicao substitui motorista anterior e registra evento no historico.
- Filtro combinado funciona em `GET /api/motoristas/:id/entregas?status=CRIADA`.

## Contratos de Repository

Os contratos foram documentados em JSDoc no arquivo:

- `src/repositories/contracts.js`

Interfaces esperadas:

- `IEntregasRepository`
	- `listarTodos(filtros?)`
	- `buscarPorId(id)`
	- `criar(dados)`
	- `atualizar(id, dados)`
- `IMotoristasRepository`
	- `listarTodos()`
	- `buscarPorId(id)`
	- `buscarPorCPF(cpf)`
	- `criar(dados)`
	- `atualizar(id, dados)`

## Composicao de Dependencias

A composicao ocorre em ponto unico:

- `src/routes/index.js`

Exemplo:

```js
const db = createSqliteDatabase();
const entregasRepo = new EntregasSqliteRepository(db);
const motoristasRepo = new MotoristasSqliteRepository(db);
const entregasService = new EntregasService(entregasRepo, motoristasRepo);
const motoristasService = new MotoristasService(motoristasRepo);
```

## Documentacao HTML (JSDoc 3)

Gerar docs:

```bash
npm run docs:jsdoc
```

Saida gerada em:

```text
docs/jsdoc/index.html
```

## Diagrama de Composicao

Arquivo de diagrama criado:

- `architecture.codediagram`

Para editar/expandir no VS Code com a extensao Code Diagram:

1. Abra a paleta de comandos (`Ctrl + Shift + P`)
2. Execute `Code Diagram: Open Diagrams (Cloud Storage)` ou abra o arquivo `.codediagram`
3. Selecione codigo em arquivos `.js`
4. Execute `Code Diagram: Snip Code`
