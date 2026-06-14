import { jest } from '@jest/globals';
import { EntregasService } from '../../../src/services/EntregasService.js';
import { AppError } from '../../../src/utils/AppError.js';

describe('EntregasService (Unit Tests)', () => {
  let entregasService;
  let mockEntregasRepository;
  let mockMotoristasRepository;

  beforeEach(() => {
    mockEntregasRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarEntregaAtiva: jest.fn(),
      listarTodos: jest.fn(),
      atualizar: jest.fn(),
      contar: jest.fn()
    };
    mockMotoristasRepository = {
      buscarPorId: jest.fn()
    };
    entregasService = new EntregasService(mockEntregasRepository, mockMotoristasRepository);
  });

  test('Deve lançar erro 400 se a origem for idêntica ao destino', async () => {
    const dados = { descricao: 'Carga A', origem: 'Rua A', destino: 'Rua A', criadorId: 1 };

    await expect(entregasService.criarEntrega(dados)).rejects.toThrow(
      new AppError('Origem e destino não podem ser iguais', 400)
    );
  });

  test('Deve lançar erro 400 se a entrega já estiver duplicada e ativa', async () => {
    mockEntregasRepository.buscarEntregaAtiva.mockResolvedValue({ id: 99, status: 'CRIADA' });
    const dados = { descricao: 'Carga A', origem: 'Rua A', destino: 'Rua B', criadorId: 1 };

    await expect(entregasService.criarEntrega(dados)).rejects.toThrow(
      new AppError('Entrega duplicada ativa', 400)
    );
  });

  test('Deve avançar com sucesso o status de uma entrega CRIADA para EM_TRANSITO', async () => {
    const entregaFake = { id: 1, status: 'CRIADA', historico: [] };
    mockEntregasRepository.buscarPorId.mockResolvedValue(entregaFake);
    mockEntregasRepository.atualizar.mockImplementation((id, dados) => dados);

    const resultado = await entregasService.avancarEntrega(1);

    expect(resultado.status).toBe('EM_TRANSITO');
    expect(resultado.historico[0].descricao).toBe('Saiu para entrega');
  });

  test('Deve alterar para ENTREGUE quando avançar uma entrega EM_TRANSITO', async () => {
    const entregaFake = { id: 1, status: 'EM_TRANSITO', historico: [] };
    mockEntregasRepository.buscarPorId.mockResolvedValue(entregaFake);
    mockEntregasRepository.atualizar.mockImplementation((id, dados) => dados);

    const resultado = await entregasService.avancarEntrega(1);

    expect(resultado.status).toBe('ENTREGUE');
    expect(resultado.historico[0].descricao).toBe('Entrega finalizada');
  });

  test('Deve rejeitar avanço se a entrega já estiver no estado ENTREGUE ou CANCELADA', async () => {
    mockEntregasRepository.buscarPorId.mockResolvedValue({ id: 1, status: 'ENTREGUE', historico: [] });

    await expect(entregasService.avancarEntrega(1)).rejects.toThrow(
      new AppError('Entrega já finalizada', 400)
    );
  });

  test('Deve permitir o cancelamento de uma entrega que ainda está com status CRIADA', async () => {
    mockEntregasRepository.buscarPorId.mockResolvedValue({ id: 1, status: 'CRIADA', historico: [] });
    mockEntregasRepository.atualizar.mockImplementation((id, dados) => dados);

    const resultado = await entregasService.cancelarEntrega(1);

    expect(resultado.status).toBe('CANCELADA');
  });

  test('Deve lançar erro ao tentar cancelar uma entrega já FINALIZADA (ENTREGUE)', async () => {
    mockEntregasRepository.buscarPorId.mockResolvedValue({ id: 1, status: 'ENTREGUE', historico: [] });

    await expect(entregasService.cancelarEntrega(1)).rejects.toThrow(
      new AppError('Não é possível cancelar entrega finalizada', 400)
    );
  });

  test('Deve listar entregas aplicando filtros de status corretamente', async () => {
    const filtros = 'CRIADA';
    mockEntregasRepository.listarTodos.mockResolvedValue([{ id: 1, status: 'CRIADA' }]);

    const resultado = await entregasService.listarEntregas(filtros);

    expect(resultado).toHaveLength(1);
    expect(mockEntregasRepository.listarTodos).toHaveBeenCalledWith({ status: 'CRIADA' });
  });

  test('Deve retornar todas as entregas se nenhum filtro estruturado for enviado', async () => {
    mockEntregasRepository.listarTodos.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    const resultado = await entregasService.listarEntregas(null);

    expect(resultado).toHaveLength(2);
  });

  test('Deve lançar erro 404 ao buscar uma entrega por ID inexistente', async () => {
    mockEntregasRepository.buscarPorId.mockResolvedValue(null);

    await expect(entregasService.buscarPorId(999)).rejects.toThrow(
      new AppError('Entrega não encontrada', 404)
    );
  });

  test('Deve listar entregas por motorista sem filtro de status adicional', async () => {
    mockEntregasRepository.listarTodos.mockResolvedValue([{ id: 1, motoristaId: 10 }]);
    
    const resultado = await entregasService.listarEntregasPorMotorista("10");
    
    expect(resultado).toHaveLength(1);
    expect(mockEntregasRepository.listarTodos).toHaveBeenCalledWith({ motoristaId: 10 });
  });

  test('Deve listar entregas por motorista aplicando filtro de status', async () => {
    mockEntregasRepository.listarTodos.mockResolvedValue([{ id: 1, motoristaId: 10, status: 'CRIADA' }]);
    
    const resultado = await entregasService.listarEntregasPorMotorista(10, 'CRIADA');
    
    expect(resultado).toHaveLength(1);
    expect(mockEntregasRepository.listarTodos).toHaveBeenCalledWith({ motoristaId: 10, status: 'CRIADA' });
  });

  test('Deve retornar o histórico completo de uma entrega', async () => {
    const historicoFake = [{ data: '2026-01-01', descricao: 'Criada' }];
    mockEntregasRepository.buscarPorId.mockResolvedValue({ id: 1, historico: historicoFake });
    
    const resultado = await entregasService.obterHistorico(1);
    
    expect(resultado).toEqual(historicoFake);
  });

  test('Deve atribuir um motorista pela primeira vez a uma entrega com status CRIADA', async () => {
    const entregaFake = { id: 1, status: 'CRIADA', motoristaId: null, historico: [] };
    const motoristaFake = { id: 5, nome: 'Carlos Silva', status: 'ATIVO' };
    
    mockEntregasRepository.buscarPorId.mockResolvedValue(entregaFake);
    mockMotoristasRepository.buscarPorId.mockResolvedValue(motoristaFake);
    mockEntregasRepository.atualizar.mockImplementation((id, dados) => dados);

    const resultado = await entregasService.atribuirMotorista(1, 5);
    
    expect(resultado.motoristaId).toBe(5);
    expect(resultado.historico[0].descricao).toContain('Motorista atribuído: Carlos Silva');
  });

  test('Deve registrar substituição no histórico se a entrega já possuía outro motorista', async () => {
    const entregaFake = { id: 1, status: 'CRIADA', motoristaId: 3, historico: [] };
    const motoristaFake = { id: 5, nome: 'Carlos Silva', status: 'ATIVO' };
    
    mockEntregasRepository.buscarPorId.mockResolvedValue(entregaFake);
    mockMotoristasRepository.buscarPorId.mockResolvedValue(motoristaFake);
    mockEntregasRepository.atualizar.mockImplementation((id, dados) => dados);

    const resultado = await entregasService.atribuirMotorista(1, 5);
    
    expect(resultado.historico[0].descricao).toContain('Motorista substituído para Carlos Silva');
  });

  test('Deve lançar erro 422 ao tentar atribuir motorista a uma entrega que não esteja mais CRIADA', async () => {
    mockEntregasRepository.buscarPorId.mockResolvedValue({ id: 1, status: 'EM_TRANSITO' });
    
    await expect(entregasService.atribuirMotorista(1, 5)).rejects.toThrow(
      new AppError('Apenas entregas com status CRIADA podem receber motorista', 422)
    );
  });

  test('Deve lançar erro 422 ao tentar atribuir um motorista com status INATIVO', async () => {
    mockEntregasRepository.buscarPorId.mockResolvedValue({ id: 1, status: 'CRIADA', motoristaId: null });
    mockMotoristasRepository.buscarPorId.mockResolvedValue({ id: 7, nome: 'Roberto', status: 'INATIVO' });
    
    await expect(entregasService.atribuirMotorista(1, 7)).rejects.toThrow(
      new AppError('Não é permitido atribuir motorista INATIVO', 422)
    );
  });

  test('Deve contar entregas usando filtro de texto simplificado', async () => {
    mockEntregasRepository.contar.mockResolvedValue(3);
    
    const resultado = await entregasService.contarEntregas('CRIADA');
    
    expect(resultado).toBe(3);
    expect(mockEntregasRepository.contar).toHaveBeenCalledWith({ status: 'CRIADA' });
  });

  test('Deve contar entregas sem nenhum objeto de filtro especificado', async () => {
    mockEntregasRepository.contar.mockResolvedValue(8);
    
    const resultado = await entregasService.contarEntregas(null);
    
    expect(resultado).toBe(8);
    expect(mockEntregasRepository.contar).toHaveBeenCalledWith({});
  });
});