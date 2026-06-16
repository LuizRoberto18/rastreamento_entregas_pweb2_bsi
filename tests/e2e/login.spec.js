import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Fluxos de Autenticação - Login', () => {

  test('Login inválido — Credenciais incorretas exibem mensagem de erro visível e não redirecionam', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.realizarLogin('errado@teste.com', 'senhaIncorreta');

    // Valida que o alerta de erro ficou visível
    await expect(loginPage.alertaErro).toBeVisible();

    // Garante que a URL não mudou para a página interna
    await expect(page).not.toHaveURL(/\/entregas/);
  });

  test('Login válido — Credenciais corretas redirecionam para /entregas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Use credenciais válidas que existam no seu banco de sementes (seed) ou massa de teste do backend
    await loginPage.realizarLogin('gestor@teste.com', 'senha_ficticio');

    // Verifica o redirecionamento automático
    await expect(page).toHaveURL(/\/entregas/);
  });

  test('Acesso sem autenticação — Navegar para /entregas sem token redireciona para /login', async ({ page }) => {
    // Tenta acessar a rota restrita diretamente com o LocalStorage/Cookies limpos
    await page.goto('/entregas');
    await page.waitForURL(/\/login/);
  });
});