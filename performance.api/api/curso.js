import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criar = async (ctx) => {
  const {
    titulo,
    subtitulo,
    uf,
    municipio,
    endereco,
    dataInicio,
    dataFim,
    isActive,
    professores,
    niveis,
  } = ctx.request.body;

  const niveisNovo = niveis.map((nivel) => ({
    conteudo: nivel.conteudo,
    descricao: nivel.descricao,
    nivel: nivel.nivel,
    publico_alvo: nivel.publicoAlvo,
    valor: nivel.valor,
  }));

  const professoresNovosIds = professores.map((professorId) => ({
    professor_id: professorId,
  }));

  try {
    const novoCurso = await prisma.cursos.create({
      data: {
        titulo,
        subtitulo,
        uf,
        municipio,
        endereco,
        data_inicio: new Date(dataInicio.concat("T00:00:00.000Z")),
        data_fim: new Date(dataFim.concat("T00:00:00.000Z")),
        is_active: isActive === "true",
        niveis: {
          createMany: {
            data: niveisNovo,
          },
        },
        professores: {
          createMany: {
            data: professoresNovosIds,
          },
        },
      },
      include: {
        niveis: true,
        professores: { include: { professor: true } },
      },
    });

    ctx.body = {
      success: true,
      message: "Curso criado com sucesso!",
      data: novoCurso,
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
    const cursos = await prisma.cursos.findMany({});

    ctx.body = {
      success: true,
      data: cursos,
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
    const curso = await prisma.cursos.findUnique({
      where: { id: params.id },
      include: {
        niveis: true,
        professores: {
          include: {
            professor: true,
          },
        },
      },
    });

    ctx.body = {
      success: true,
      data: curso,
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
  const {
    titulo,
    subtitulo,
    uf,
    municipio,
    endereco,
    dataInicio,
    dataFim,
    isActive,
    professores,
    niveis,
  } = ctx.request.body;

  try {
    // Buscar o curso existente com professores e níveis
    const cursoExistente = await prisma.cursos.findUnique({
      where: { id },
      include: {
        professores: true,
        niveis: true,
      },
    });

    // IDs dos professores e níveis existentes
    const professoresExistentesIds = cursoExistente.professores.map(
      (p) => p.professor_id
    );
    const niveisExistentesIds = cursoExistente.niveis.map((dc) => dc.id);

    // IDs dos novos professores
    const professoresNovosIds = professores
      .filter((professorId) => !professoresExistentesIds.includes(professorId))
      .map((professorId) => ({ professor_id: professorId }));

    // IDs dos professores e níveis a serem excluídos
    const professoresParaExcluir = professoresExistentesIds.filter(
      (id) => !professores.includes(id)
    );
    const niveisParaExcluir = niveisExistentesIds.filter(
      (id) => !niveis.includes(id)
    );

    // Atualizar o curso
    const curso = await prisma.cursos.update({
      where: { id },
      data: {
        titulo,
        subtitulo,
        uf,
        municipio,
        endereco,
        data_inicio: new Date(dataInicio.concat("T00:00:00.000Z")),
        data_fim: new Date(dataFim.concat("T00:00:00.000Z")),
        is_active: isActive === "true",
        niveis: {
          deleteMany: {
            id: { in: niveisParaExcluir },
          },
          upsert: niveis.map(
            ({ id = "", conteudo, publicoAlvo, valor, descricao, nivel }) => {
              const commonFields = {
                conteudo,
                publico_alvo: publicoAlvo,
                valor,
                descricao,
                nivel,
              };

              return {
                where: { id },
                create: commonFields,
                update: commonFields,
              };
            }
          ),
        },
        professores: {
          deleteMany: { professor_id: { in: professoresParaExcluir } },
          createMany: {
            data: professoresNovosIds,
          },
        },
      },
      include: {
        professores: true,
        niveis: true,
      },
    });

    ctx.body = {
      success: true,
      message: "Curso editado com sucesso!",
      data: curso,
    };
    ctx.status = 201;
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      message: error.message,
    };
    ctx.status = 500;
  }
};

export const deletar = async (ctx) => {
  try {
    const curso = await prisma.cursos.delete({
      where: { id: ctx.params.id },
    });

    ctx.body = {
      success: true,
      message: "Curso excluído com sucesso!",
      data: curso,
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
