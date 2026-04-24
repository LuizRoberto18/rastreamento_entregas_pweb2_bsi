import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

function initializeSchema(db) {
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS motoristas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      placa_veiculo TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('ATIVO', 'INATIVO')),
      criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS entregas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      origem TEXT NOT NULL,
      destino TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('CRIADA', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADA')),
      motorista_id INTEGER NULL REFERENCES motoristas(id) ON DELETE SET NULL,
      criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS eventos_entrega (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entrega_id INTEGER NOT NULL REFERENCES entregas(id) ON DELETE CASCADE,
      data_evento TEXT NOT NULL,
      descricao TEXT NOT NULL,
      criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_entregas_status ON entregas(status);
    CREATE INDEX IF NOT EXISTS idx_entregas_motorista_id ON entregas(motorista_id);
    CREATE INDEX IF NOT EXISTS idx_eventos_entrega_id ON eventos_entrega(entrega_id);
  `);
}

export function createSqliteDatabase(filePath = process.env.SQLITE_PATH) {
  const resolvedFilePath = filePath || path.join(process.cwd(), "data", "rastreamento.sqlite");
  const directoryPath = path.dirname(resolvedFilePath);

  fs.mkdirSync(directoryPath, { recursive: true });

  const db = new Database(resolvedFilePath);
  initializeSchema(db);

  return db;
}
