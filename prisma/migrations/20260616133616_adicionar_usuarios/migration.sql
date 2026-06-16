-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "papel" TEXT NOT NULL DEFAULT 'OPERADOR',
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_entregas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "motorista_id" INTEGER,
    "criador_id" INTEGER,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL,
    CONSTRAINT "entregas_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "motoristas" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "entregas_criador_id_fkey" FOREIGN KEY ("criador_id") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_entregas" ("atualizado_em", "criado_em", "descricao", "destino", "id", "motorista_id", "origem", "status") SELECT "atualizado_em", "criado_em", "descricao", "destino", "id", "motorista_id", "origem", "status" FROM "entregas";
DROP TABLE "entregas";
ALTER TABLE "new_entregas" RENAME TO "entregas";
CREATE INDEX "entregas_status_idx" ON "entregas"("status");
CREATE INDEX "entregas_motorista_id_idx" ON "entregas"("motorista_id");
CREATE INDEX "entregas_criador_id_idx" ON "entregas"("criador_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
