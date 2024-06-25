import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const parseCoursesMiddleware = async (ctx, next) => {
  try {
    const cursos = await prisma.cursos.findMany({
      include: {
        niveis: true,
        professores: { include: { professor: true } },
      },
    });

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

export default parseCoursesMiddleware;
