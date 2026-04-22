import pg from "pg";

const { Pool } = pg;

export function createPgPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL nao definida. Configure a variavel de ambiente antes de iniciar a API.");
  }

  const pool = new Pool({ connectionString });

  pool.on("error", (err) => {
    console.error("Erro inesperado no pool PostgreSQL:", err);
  });

  return pool;
}
