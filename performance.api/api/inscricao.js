import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criar = async (ctx) => {
  const data = {
    nome: ctx.request.body.nome,
    email: ctx.request.body.email,
    telefone: ctx.request.body.telefone,
    cnpj: ctx.request.body.cnpj,
    cpf: ctx.request.body.cpf,
    unidadegestora: ctx.request.body.unidadegestora,
    cargo: ctx.request.body.cargo,
    endereco: ctx.request.body.endereco,
    bairro: ctx.request.body.bairro,
    municipio: ctx.request.body.municipio,
    estado: ctx.request.body.estado,
    cep: ctx.request.body.cep,
    curso_id: ctx.request.body.cursoId,
    nivel_id: ctx.request.body.nivelId,
  };

  try {
    const inscricao = await prisma.inscricoes.create({ data });

    ctx.body = {
      success: true,
      message: "Inscrição enviada com sucesso!",
      data: inscricao,
    };
    ctx.status = 201;
  } catch (error) {
    ctx.body = {
      success: false,
      message: error.message,
    };
    ctx.status = 500;
  }
};

export const listar = async (ctx) => {
  try {
    const inscricoes = await prisma.inscricoes.findMany({});

    ctx.body = {
      success: true,
      data: inscricoes,
    };

    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
};

export const buscar = async (ctx) => {
  let params = ctx.params;
  try {
    const inscricao = await prisma.inscricoes.findUnique({
      where: {
        id: params.id,
      },
    });

    ctx.body = {
      success: true,
      data: inscricao,
    };
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      success: false,
      message: error,
    };
    ctx.status = 500;
  }
};

export const deletar = async (ctx) => {
  try {
    const inscricao = await prisma.inscricoes.delete({
      where: {
        id: ctx.params.id,
      },
    });

    ctx.body = {
      success: true,
      message: "Inscrição excluída com sucesso!",
      data: inscricao,
    };
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      success: false,
      message: error.message,
    };
    ctx.status = 500;
  }
};
