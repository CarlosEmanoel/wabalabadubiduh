import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criar = async (ctx) => {
  const { nome, curriculo, ext } = ctx.request.body;

  try {
    const professor = await prisma.professores.create({
      data: {
        nome,
        curriculo,
        ext: ext || null,
      },
    });

    ctx.body = {
      success: true,
      message: "Professor criado com sucesso!",
      data: professor,
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
    const professores = await prisma.professores.findMany({});

    ctx.body = {
      success: true,
      data: professores,
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
    const professor = await prisma.professores.findUnique({
      where: {
        id: params.id,
      },
    });

    ctx.body = {
      success: true,
      data: professor,
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

export const editar = async (ctx) => {
  const { id } = ctx.params;
  const { nome, curriculo, ext } = ctx.request.body;

  try {
    const professor = await prisma.professores.update({
      where: { id: id },
      data: {
        nome,
        curriculo,
        ext: ext || null,
      },
    });

    ctx.body = {
      success: true,
      message: "Professor editado com sucesso!",
      data: professor,
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

export const deletar = async (ctx) => {
  try {
    const professor = await prisma.professores.delete({
      where: {
        id: ctx.params.id,
      },
    });

    ctx.body = {
      success: true,
      message: "Professor excluído com sucesso!",
      data: professor,
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