import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { EntregasPage } from './pages/EntregasPage';

test.describe('Fluxos Internos - Entregas', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Realiza o login prévio necessário para acessar a área logada
    await loginPage.realizarLogin('gestor@teste.com', 'senha_ficticio');
    await expect(page).toHaveURL(/\/entregas/);
  });

  test('Listagem de entregas — Tabela exibida com ao menos uma linha', async ({ page }) => {
    const entregasPage = new EntregasPage(page);
    
    // Garante que a tabela está visível em tela
    await expect(entregasPage.tabelaEntregas).toBeVisible();
    
    // Verifica se existe pelo menos uma tag 'tr' (linha) de dados dentro da tabela
    const linhas = entregasPage.tabelaEntregas.locator('tbody tr');
    await expect(linhas.first()).toBeVisible();
    expect(await linhas.count()).toBeGreaterThan(0);
  });

  test('Logout — Clicar em "Sair" redireciona para /login e impede acesso retroativo a /entregas', async ({ page }) => {
    const entregasPage = new EntregasPage(page);
    
    // Efetua o clique no botão Sair encapsulado no POM
    await entregasPage.deslogar();
    
    // Valida redirecionamento imediato para o login
    await expect(page).toHaveURL(/\/login/);
    
    // Tenta voltar de forma forçada para a rota de entregas
    await page.goto('/entregas');
    
    // Deve continuar bloqueado e ser jogado para o login novamente
    await expect(page).toHaveURL(/\/login/);
  });
});