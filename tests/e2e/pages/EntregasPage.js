export class EntregasPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.tabelaEntregas = page.getByTestId('tabela-entregas');
    this.logoutBtn = page.getByTestId('btn-logout'); // Adicione este test-id no seu botão de Sair
  }

  async navegar() {
    await this.page.goto('/entregas');
  }

  async deslogar() {
    await this.logoutBtn.click();
  }
}