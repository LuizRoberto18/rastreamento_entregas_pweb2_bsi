@echo off
set NODE_NO_WARNINGS=1
echo ===================================================
echo   Configurando o Ambiente de Rastreamento de Entregas
echo ===================================================
echo.

echo [+] 1. Instalando dependencias do backend...
call npm install

echo.
echo [+] 2. Criando arquivos de ambiente (.env e .env.test)...

:: Cria o .env de desenvolvimento
(
echo DATABASE_URL="file:./prisma/dev.db"
echo SQLITE_PATH=./data/rastreamento.sqlite
echo PORT=3000
echo JWT_SECRET=uma_chave_super_secreta_e_longa_aqui_123456!
echo JWT_EXPIRES_IN=8h
) > .env

:: Cria o .env.test de testes
(
echo PORT=3000
echo DATABASE_URL="file:./test.db"
echo JWT_SECRET="SECRETO_DE_TESTES_SUPER_SEGURO_E_LONGO_123!"
echo JWT_EXPIRES_IN="1h"
echo NODE_ENV="test"
) > .env.test

echo.
echo [+] 3. Configurando o Banco de Dados (Prisma)...
call npx prisma generate

echo.
echo [-] Aplicando migracoes no banco de desenvolvimento...
call npx prisma migrate dev --name init_setup

echo.
echo [-] Sincronizando o banco de testes (.env.test)...
:: Apaga o banco de testes antigo se ele existir para evitar dados residuais de outras máquinas
if exist test.db del /f /q test.db
call npx -p dotenv-cli dotenv -e .env.test -- npx prisma db push

echo.
echo [+] 4. Inserindo dados iniciais (Seed)...
call npx prisma db seed

echo.
echo [+] 5. Instalando dependencias do Frontend e Playwright...
:: Se a pasta views for um projeto npm isolado:
if exist views (
    cd views
    call npm install
    cd ..
)
call npx playwright install

echo.
echo ===================================================
echo   Configuracao concluida com sucesso!
echo   Executando a suite de testes para validacao...
echo ===================================================
echo.

echo [+] Rodando Testes Unitarios e Integracao (Jest)...
call npm test

echo.
echo [+] Rodando Testes de Cobertura (Coverage)...
call npm run test:coverage

echo.
echo [+] Rodando Testes de Tela Ponta a Ponta (Playwright E2E)...
call npm run test:e2e

echo.
echo ===================================================
echo   Todos os testes concluidos! Sistema pronto para uso.
echo ===================================================
pause