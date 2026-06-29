##############################################################################
# Rastreamento de Entregas
# Setup de Apresentação Docker
##############################################################################

set -e

export NODE_NO_WARNINGS=1

echo
echo "==========================================================="
echo "     Rastreamento de Entregas - Modo Demonstração Ativa"
echo "==========================================================="
echo

##############################################################################
# Estrutura e Orquestração do Banco (Prisma)
##############################################################################
echo "[1/4] Sincronizando schemas e executando Seeds (Prisma)..."
mkdir -p prisma data coverage test-results playwright-report
rm -f prisma/dev.db test.db

# Injeta variáveis de ambiente locais
cat > .env <<EOF
DATABASE_URL="file:./prisma/dev.db"
SQLITE_PATH=./data/rastreamento.sqlite
PORT=3000
JWT_SECRET=uma_chave_super_secreta_e_longa_aqui_123456!
JWT_EXPIRES_IN=8h
NODE_ENV=development
EOF

cat > .env.test <<EOF
PORT=3000
DATABASE_URL="file:./test.db"
JWT_SECRET=SECRETO_DE_TESTES_SUPER_SEGURO_E_LONGO_123!
JWT_EXPIRES_IN=1h
NODE_ENV=test
EOF

npx prisma generate
npx prisma db push --accept-data-loss
npx -y dotenv-cli -e .env.test -- prisma db push --accept-data-loss

echo "Populando banco com dados iniciais..."
npx prisma db seed
echo

##############################################################################
# Execução das Suites de Testes (Validação Automatizada)
##############################################################################
echo "[2/4] Executando pipeline de testes automáticos..."
npm run test:coverage
npm run test:e2e
echo

##############################################################################
# Inicialização do Servidor de Demonstração (Porta 3000)
##############################################################################
echo "[3/4] Inicializando o Servidor Express em background..."

node src/server.js

# Aguarda 3 segundos para garantir que o Express subiu totalmente
sleep 3
echo

##############################################################################
# Inicialização do Relatório Playwright (Porta 9323)
##############################################################################
echo "[4/4] Servindo relatório de testes do Playwright..."
echo "========================================================================"
echo "SISTEMA PRONTO!"
echo "------------------------------------------------------------------------"
echo "Para testar a aplicação/autenticação: http://localhost:3000"
echo "Para abrir o relatório do Playwright:  http://localhost:9323"
echo "------------------------------------------------------------------------"
echo "🛑 Para encerrar tudo e destruir o container, aperte CTRL + C"
echo "========================================================================"

# Mantém o container aberto servindo o relatório em primeiro plano
npx playwright show-report --host 0.0.0.0