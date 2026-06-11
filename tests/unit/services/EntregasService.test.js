import { jest } from "@jest/globals";
import { EntregasService } from "../../../src/services/EntregasService.js";
import { AppError } from "../../../src/utils/AppError.js";

describe("EntregasService (Unit Tests)", () => {
  let entregasService;
  let mockEntregasRepo;
  let mockMotoristasRepo;

  beforeEach(() => {
    mockEntregasRepo = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      atualizar: jest.fn(),
      buscarEntregaAtiva: jest.fn(), // Alinhado com o seu erro (buscarEntregaAtiva)
    };

    mockMotoristasRepo = {
      buscarPorId: jest.fn(),
    };

    entregasService = new EntregasService(mockEntregasRepo, mockMotoristasRepo);
  });

  // 1. Origem igual ao destino
  test("Deve lançar erro 400 se a origem for idêntica ao destino", async () => {
    const dadosEntrega = { origem: "Rua A, 123", destino: "Rua A, 123", motoristaId: 1 };

    await expect(entregasService.criarEntrega(dadosEntrega))
      .rejects
      .toThrow();
    
    expect(mockEntregasRepo.criar).not.toHaveBeenCalled();
  });

  // 2. Entrega duplicada ativa
  test("Deve lançar erro se a entrega já estiver duplicada e ativa", async () => {
    const dadosEntrega = { descricao: "Pacote", origem: "Rua A", destino: "Rua B", motoristaId: 1 };
    
    // Simula que achou uma duplicada ativa conforme a linha 30 do seu código real
    mockEntregasRepo.buscarEntregaAtiva.mockResolvedValue({ id: 99, status: "CRIADA" });

    await expect(entregasService.criarEntrega(dadosEntrega))
      .rejects
      .toThrow(new AppError("Entrega duplicada ativa", 400)); // Pegou da sua linha 33 real!
  });

  // 3. Transição CRIADA -> EM_TRANSITO (Usando avancarEntrega)
  test("Deve avançar com sucesso o status de uma entrega CRIADA", async () => {
    const entregaExistente = { id: 1, status: "CRIADA", historico: [] };
    mockEntregasRepo.buscarPorId.mockResolvedValue(entregaExistente);
    mockEntregasRepo.atualizar.mockResolvedValue({ id: 1, status: "EM_TRANSITO" });

    // Mudamos de atualizarStatus para avancarEntrega com base nas suas rotas
    const resultado = await entregasService.avancarEntrega(1);

    expect(resultado.status).toBe("EM_TRANSITO");
    expect(mockEntregasRepo.atualizar).toHaveBeenCalled();
  });

  // 4. Transição EM_TRANSITO -> ENTREGUE
  test("Deve alterar para ENTREGUE quando avançar uma entrega EM_TRANSITO", async () => {
    const entregaExistente = { id: 1, status: "EM_TRANSITO", historico: [] };
    mockEntregasRepo.buscarPorId.mockResolvedValue(entregaExistente);
    mockEntregasRepo.atualizar.mockResolvedValue({ id: 1, status: "ENTREGUE" });

    const resultado = await entregasService.avancarEntrega(1);

    expect(resultado.status).toBe("ENTREGUE");
  });

  // 5. Transição inválida a partir de ENTREGUE
  test("Deve rejeitar avanço se a entrega já estiver no estado ENTREGUE", async () => {
    const entregaExistente = { id: 1, status: "ENTREGUE", historico: [] };
    mockEntregasRepo.buscarPorId.mockResolvedValue(entregaExistente);

    await expect(entregasService.avancarEntrega(1)).rejects.toThrow();
  });

  // 6. Cancelamento com status CRIADA
  test("Deve permitir o cancelamento de uma entrega que ainda está com status CRIADA", async () => {
    // Alinhamento com a linha 121: passamos o array 'historico' para o .push() não quebrar
    const entregaExistente = { id: 1, status: "CRIADA", historico: [] };
    mockEntregasRepo.buscarPorId.mockResolvedValue(entregaExistente);
    mockEntregasRepo.atualizar.mockResolvedValue({ id: 1, status: "CANCELADA" });

    const resultado = await entregasService.cancelarEntrega(1);

    expect(resultado.status).toBe("CANCELADA");
    expect(mockEntregasRepo.atualizar).toHaveBeenCalled();
  });

  // 7. Cancelamento de entrega com status ENTREGUE
  test("Deve lançar erro ao tentar cancelar uma entrega já FINALIZADA/ENTREGUE", async () => {
    const entregaExistente = { id: 1, status: "ENTREGUE" };
    mockEntregasRepo.buscarPorId.mockResolvedValue(entregaExistente);

    // Sincronizado perfeitamente com sua linha 113 real!
    await expect(entregasService.cancelarEntrega(1))
      .rejects
      .toThrow(new AppError("Não é possível cancelar entrega finalizada", 400));
    
    expect(mockEntregasRepo.atualizar).not.toHaveBeenCalled();
  });
});