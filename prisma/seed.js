import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function diasAtras(dias) {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d;
}

async function main() {
  await prisma.eventoEntrega.deleteMany();
  await prisma.entrega.deleteMany();
  await prisma.motorista.deleteMany();
  await prisma.usuario.deleteMany();

  const senhaCriptografada = await bcrypt.hash("senha_ficticio", 10); 

  await prisma.usuario.create({
    data: {
      nome: "Gestor de Testes",
      email: "gestor@teste.com",
      senhaHash: senhaCriptografada,
      papel: "GESTOR" 
    }
  });
  const motoristas = await prisma.$transaction([
    prisma.motorista.create({
      data: {
        nome: "Joao Almeida",
        cpf: "11111111111",
        placaVeiculo: "ABC1D23",
        status: "ATIVO"
      }
    }),
    prisma.motorista.create({
      data: {
        nome: "Maria Costa",
        cpf: "22222222222",
        placaVeiculo: "XYZ9K88",
        status: "ATIVO"
      }
    }),
    prisma.motorista.create({
      data: {
        nome: "Carlos Lima",
        cpf: "33333333333",
        placaVeiculo: "QWE4R56",
        status: "INATIVO"
      }
    })
  ]);

  const specs = [
    { descricao: "Notebook Dell", origem: "Maceio", destino: "Recife", status: "CRIADA", motoristaId: motoristas[0].id, dias: 100 },
    { descricao: "Smartphone Samsung", origem: "Sao Paulo", destino: "Rio de Janeiro", status: "EM_TRANSITO", motoristaId: motoristas[1].id, dias: 90 },
    { descricao: "Monitor 27", origem: "Campinas", destino: "Curitiba", status: "ENTREGUE", motoristaId: motoristas[1].id, dias: 80 },
    { descricao: "Teclado Mecanico", origem: "Belo Horizonte", destino: "Salvador", status: "CANCELADA", motoristaId: null, dias: 70 },
    { descricao: "Headset Gamer", origem: "Fortaleza", destino: "Natal", status: "CRIADA", motoristaId: null, dias: 60 },
    { descricao: "Mouse Sem Fio", origem: "Goiania", destino: "Brasilia", status: "EM_TRANSITO", motoristaId: motoristas[0].id, dias: 50 },
    { descricao: "Servidor Rack", origem: "Porto Alegre", destino: "Florianopolis", status: "ENTREGUE", motoristaId: motoristas[0].id, dias: 40 },
    { descricao: "Roteador Wi-Fi", origem: "Joao Pessoa", destino: "Aracaju", status: "CRIADA", motoristaId: motoristas[1].id, dias: 30 },
    { descricao: "Impressora Laser", origem: "Manaus", destino: "Belem", status: "EM_TRANSITO", motoristaId: motoristas[1].id, dias: 20 },
    { descricao: "Tablet Android", origem: "Santos", destino: "Sorocaba", status: "CANCELADA", motoristaId: null, dias: 10 }
  ];

  for (const spec of specs) {
    const createdAt = diasAtras(spec.dias);
    const eventos = [
      {
        dataEvento: createdAt,
        descricao: "Entrega criada"
      }
    ];

    if (spec.motoristaId) {
      eventos.push({
        dataEvento: new Date(createdAt.getTime() + 2 * 60 * 60 * 1000),
        descricao: "Motorista atribuido"
      });
    }

    if (spec.status === "EM_TRANSITO" || spec.status === "ENTREGUE") {
      eventos.push({
        dataEvento: new Date(createdAt.getTime() + 4 * 60 * 60 * 1000),
        descricao: "Saiu para entrega"
      });
    }

    if (spec.status === "ENTREGUE") {
      eventos.push({
        dataEvento: new Date(createdAt.getTime() + 6 * 60 * 60 * 1000),
        descricao: "Entrega finalizada"
      });
    }

    if (spec.status === "CANCELADA") {
      eventos.push({
        dataEvento: new Date(createdAt.getTime() + 3 * 60 * 60 * 1000),
        descricao: "Entrega cancelada"
      });
    }

    await prisma.entrega.create({
      data: {
        descricao: spec.descricao,
        origem: spec.origem,
        destino: spec.destino,
        status: spec.status,
        motoristaId: spec.motoristaId,
        createdAt,
        eventos: {
          create: eventos
        }
      }
    });
  }

  console.log("Seed concluido: 3 motoristas e 10 entregas criadas.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
