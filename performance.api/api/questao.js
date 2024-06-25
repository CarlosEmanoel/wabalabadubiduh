import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (ctx) => {
  const {
    nivel,
    pergunta,
    respostacorreta,
    respostacomentada,
    alternativas,
    tipo,
  } = ctx.request.body;

  try {
    const data = {
      pergunta,
      respostacorreta,
      respostacomentada,
      nivel,
      tipo,
    };

    let questaoAtualizada = await prisma.questao.create({ data });

    // Cria ou atualiza cada alternativa
    for (const alternativa of alternativas) {
      const { letra, resposta } = alternativa;

      const alternativaData = {
        letra,
        resposta,
        questaoId: questaoAtualizada.id,
      };

      await prisma.alternativa.create({
        data: alternativaData,
      });
    }

    ctx.body = {
      success: true,
      message: "Registro criado com sucesso!",
      data: questaoAtualizada,
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

export const editar = async (ctx) => {
  try {
    const {
      id,
      nivel,
      tipo,
      pergunta,
      respostacorreta,
      respostacomentada,
      alternativas,
    } = ctx.request.body;

    let data = { pergunta, respostacorreta, respostacomentada, nivel, tipo };

    const questao = await prisma.questao.update({
      where: { id },
      data,
    });

    let existe = [];
    for (const alternativa of alternativas) {
      if (alternativa.id !== 0) existe.push(alternativa.id);
    }

    if (existe.length > 0) {
      const alternativasParaRemover = await prisma.alternativa.deleteMany({
        where: {
          AND: [
            {
              questaoId: id,
            },
            {
              NOT: {
                id: {
                  in: existe,
                },
              },
            },
          ],
        },
      });
    }

    // Cria ou atualiza cada alternativa
    for (const alternativa of alternativas) {
      const {
        id: id = 0,
        questaoId: questaoId = "",
        letra,
        resposta,
      } = alternativa;

      const alternativaData = {
        letra,
        resposta,
        questaoId: questaoId,
      };

      if (id == 0) {
        // criar alternativa
        await prisma.alternativa.create({
          data: alternativaData,
        });
      } else {
        // editar alternativa
        await prisma.alternativa.update({
          where: { id: id },
          data: alternativaData,
        });
      }
    }

    ctx.body = {
      success: true,
      message: "Registro alterado com sucesso!",
      data: questao,
    };
    ctx.status = 200;
  } catch (error) {
    console.error("Erro ao editar questão:", error);
    ctx.body = { success: false, message: error.message };
    ctx.status = 500;
  }
};

export const deletar = async (ctx) => {
  try {
    const deleteAll = await prisma.alternativa.deleteMany({
      where: {
        questaoId: ctx.params.id,
      },
    });

    const questao = await prisma.questao.delete({
      where: {
        id: ctx.params.id,
      },
    });

    ctx.body = {
      success: true,
      message: "Registro excluído com sucesso!",
      data: questao,
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
  const { nivel, tipo, texto } = ctx.query;
  let where = {};

  if (nivel) where.nivel = parseInt(nivel, 10);
  if (tipo) where.tipo = parseInt(tipo, 10);
  if (texto) where.pergunta = { contains: texto, mode: "insensitive" };

  try {
    const questoes = await prisma.questao.findMany({
      where: where, // Usa o objeto 'where' para filtrar as questões
      include: {
        alternativas: true,
      },
      orderBy: {
        pergunta: "asc",
      },
    });

    ctx.body = {
      success: true,
      data: questoes,
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

export const buscar = async (ctx) => {
  let params = ctx.params;
  try {
    const questao = await prisma.questao.findUnique({
      where: {
        id: params.id,
      },
      include: {
        alternativas: {
          orderBy: {
            letra: "asc",
          },
        },
      },
    });
    
    ctx.body = {
      success: true,
      data: questao,
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
