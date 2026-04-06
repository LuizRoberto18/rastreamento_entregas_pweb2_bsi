# rastreamento_entregas_pweb2_bsi

API de rastreamento de entregas com arquitetura Controller -> Service -> Repository,
persistencia em memoria e composicao de dependencias em ponto unico.

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
const database = new Database();
const entregasRepo = new EntregasRepository(database);
const motoristasRepo = new MotoristasRepository(database);
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
