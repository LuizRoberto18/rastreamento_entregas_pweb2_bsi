-- ATIVIDADE 07 - Migration manual (SQL puro)
-- Versao final com CHECK CONSTRAINT (sem ENUM).
-- Objetivo: arquivo idempotente e executavel em banco vazio.
--
-- COMO ESTE ARQUIVO COBRE O RF-01 E RF-02:
-- 1) RF-01 Modelagem:
--    - Tabelas exigidas: motoristas, entregas, eventos_entrega.
--    - FK com ON DELETE CASCADE: eventos_entrega.entrega_id -> entregas.id.
--    - Status com CHECK: motoristas.status e entregas.status.
--    - Campos obrigatorios com NOT NULL.
-- 2) RF-02 Migration manual:
--    - CREATE TABLE IF NOT EXISTS e CREATE INDEX IF NOT EXISTS para idempotencia.
--    - Pode ser executado em banco vazio sem depender de ORM.
-- 3) Regras extras deste arquivo:
--    - Trigger para atualizado_em em UPDATE.
--    - CHECK adicional de formato de CPF.

CREATE TABLE IF NOT EXISTS motoristas (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  placa_veiculo VARCHAR(12) NOT NULL,
  status VARCHAR(10) NOT NULL CHECK (status IN ('ATIVO', 'INATIVO')),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS entregas (
  id BIGSERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  origem VARCHAR(255) NOT NULL,
  destino VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('CRIADA', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADA')),
  motorista_id BIGINT NULL REFERENCES motoristas(id) ON DELETE SET NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS eventos_entrega (
  id BIGSERIAL PRIMARY KEY,
  entrega_id BIGINT NOT NULL REFERENCES entregas(id) ON DELETE CASCADE,
  data_evento TIMESTAMPTZ NOT NULL,
  descricao TEXT NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2) Indices recomendados para filtros e relatorios.
CREATE INDEX IF NOT EXISTS idx_entregas_status ON entregas(status);
CREATE INDEX IF NOT EXISTS idx_entregas_motorista_id ON entregas(motorista_id);
CREATE INDEX IF NOT EXISTS idx_eventos_entrega_entrega_id ON eventos_entrega(entrega_id);

-- Trigger para atualizar atualizado_em automaticamente.
CREATE OR REPLACE FUNCTION fn_set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_motoristas_set_atualizado_em ON motoristas;
CREATE TRIGGER trg_motoristas_set_atualizado_em
BEFORE UPDATE ON motoristas
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

DROP TRIGGER IF EXISTS trg_entregas_set_atualizado_em ON entregas;
CREATE TRIGGER trg_entregas_set_atualizado_em
BEFORE UPDATE ON entregas
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

-- Constraint de formato de CPF com mascara 000.000.000-00.
-- Adicao idempotente via bloco DO.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'chk_motoristas_cpf_formato'
  ) THEN
    ALTER TABLE motoristas
      ADD CONSTRAINT chk_motoristas_cpf_formato
      CHECK (cpf ~ '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$');
  END IF;
END
$$;
