export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByTestId('input-email');
    this.senhaInput = page.getByTestId('input-senha');
    this.loginBtn = page.getByTestId('btn-login');
    this.alertaErro = page.getByTestId('alerta-erro');
  }

  async navegar() {
    await this.page.goto('/login'); // Ou '/' dependendo da sua rota inicial
  }

  async preencherCredenciais(email, senha) {
    await this.emailInput.fill(email);
    await this.senhaInput.fill(senha);
  }

  async submeter() {
    await this.loginBtn.click();
  }

  async realizarLogin(email, senha) {
    await this.navegar();
    await this.preencherCredenciais(email, senha);
    await this.submeter();
  }
}