# Estratégia e Documentação de Testes

## Análise de Cobertura de Código (RF-07)

Após a execução do mapeamento de cobertura, identificamos duas lacunas críticas que estavam com cobertura zero:

1. **Método `obterPorId` em `EntregasService.js` (Tratamento de Exceção 404):**
   - **Por que não estava testado:** O fluxo feliz de integração sempre encontrava os registros injetados, deixando o bloco condicional `if (!entrega)` intocado.
   - **Impacto de um bug:** O sistema poderia retornar `null` para as rotas, estourando erros de propriedade indefinida (`Cannot read property of null`) na camada de controle do Express, derrubando a requisição com código 500 em vez de um correto 404 explicativo.
   - **Justificativa de teste:** Altamente necessário. Garantir respostas HTTP semânticas impede falhas de experiência no cliente corporativo.

2. **Validação de CNH duplicada em `MotoristasService.js`:**
   - **Por que não estava testado:** A suíte focava estritamente na criação linear sem testes de concorrência ou verificação de chaves únicas por dublês.
   - **Impacto de um bug:** Permissão de escrita duplicada no banco de dados, quebrando a integridade referencial dos dados e gerando exceções cruas do Prisma/PostgreSQL em produção.
   - **Justificativa de teste:** Crítico para segurança. Duplicidade de documentos de motoristas inválida completamente a rastreabilidade jurídica das cargas.
### Camada Unitária e Integração (Backend)
```bash
# Executar todos os testes do Backend
npm test

# Executar com relatório de cobertura (RF-07)
npm run test:coverage