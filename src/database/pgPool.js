import pg from "pg";

const { Pool } = pg;

/**
 * Factory de conexao com PostgreSQL usando SQL puro.
 *
 * PASSO A PASSO para implementar:
 * 1) Ler process.env.DATABASE_URL.
 * 2) Se estiver vazio, lancar Error com mensagem clara para facilitar debug.
 * 3) Criar new Pool({ connectionString: process.env.DATABASE_URL }).
 * 4) (Opcional) Configurar SSL apenas quando ambiente exigir (ex.: cloud).
 * 5) (Opcional) Registrar pool.on("error") para capturar queda de conexao.
 * 6) Retornar a instancia do pool para ser injetada nos repositories.
 *
 * Onde usar:
 * - Este factory sera chamado em src/routes/index.js no ponto de composicao.
 */
export function createPgPool() {
  // Exemplo de estrutura esperada:
  // return new Pool({
  //   connectionString: process.env.DATABASE_URL
  // });

  throw new Error("TODO: implementar createPgPool com pg.Pool");
}
