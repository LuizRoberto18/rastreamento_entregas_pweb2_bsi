import { jest } from '@jest/globals';
import { MotoristasService } from '../../../src/services/MotoristasService.js';
import { AppError } from '../../../src/utils/AppError.js';

describe('MotoristasService (Unit Tests)', () => {
  let motoristasService;
  let mockMotoristasRepository;

  beforeEach(() => {
    mockMotoristasRepository = {
      criar: jest.fn(),
      listarTodos: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCPF: jest.fn(),
      atualizar: jest.fn()
    };
    motoristasService = new MotoristasService(mockMotoristasRepository);
  });

  test('Deve criar um motorista com sucesso', async () => {
    const dados = { nome: 'Carlos', cpf: '12345678900', placaVeiculo: 'ABC1234' };
    mockMotoristasRepository.buscarPorCPF.mockResolvedValue(null);
    mockMotoristasRepository.criar.mockResolvedValue({ id: 1, ...dados, status: 'ATIVO' });

    const resultado = await motoristasService.criarMotorista(dados);
    expect(resultado.id).toBe(1);
  });

  test('Deve listar todos os motoristas cadastrados', async () => {
    mockMotoristasRepository.listarTodos.mockResolvedValue([{ id: 1 }, { id: 2 }]);
    
    const resultado = await motoristasService.listarMotoristas();
    
    expect(resultado).toHaveLength(2);
  });

  test('Deve lançar erro 409 ao cadastrar motorista com CPF duplicado', async () => {
    mockMotoristasRepository.buscarPorCPF.mockResolvedValue({ id: 1, cpf: '12345678900' });
    const dados = { nome: 'Outro Nome', cpf: '12345678900', placaVeiculo: 'XYZ9999' };

    await expect(motoristasService.criarMotorista(dados)).rejects.toThrow(
      new AppError('CPF já cadastrado no sistema', 409)
    );
  });

  test('Deve lançar erro 404 ao buscar por um ID de motorista inexistente', async () => {
    mockMotoristasRepository.buscarPorId.mockResolvedValue(null);

    await expect(motoristasService.buscarPorId(999)).rejects.toThrow(
      new AppError('Motorista não encontrado', 404)
    );
  });

  test('Deve atualizar o status do motorista com sucesso', async () => {
    const motoristaFake = { id: 1, nome: 'Carlos', cpf: '12345678900', placaVeiculo: 'ABC1234', status: 'ATIVO' };
    mockMotoristasRepository.buscarPorId.mockResolvedValue(motoristaFake);
    mockMotoristasRepository.atualizar.mockResolvedValue({ ...motoristaFake, status: 'INATIVO' });

    const resultado = await motoristasService.atualizarStatus(1, 'INATIVO');
    expect(resultado.status).toBe('INATIVO');
  });
});