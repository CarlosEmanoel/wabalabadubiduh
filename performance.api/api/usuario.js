import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { Buffer } from "buffer";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { promisify } from "util";
import sendMailMiddleware from "../middlewares/sendMailMiddleware.js";

const randomBytesAsync = promisify(randomBytes);
const client = new PrismaClient();

export const create = async (ctx) => {
  const password = await bcrypt.hash(ctx.request.body.password, 10);
  const confirmpassword = await bcrypt.hash(
    ctx.request.body.confirmpassword,
    10
  );

  const data = {
    nome: ctx.request.body.nome,
    cpf: ctx.request.body.cpf,
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    password: password,
    confirmpassword: confirmpassword,
    tipo: ctx.request.body.tipo,
    permissao: ctx.request.body.permissao,
    telefone: ctx.request.body.telefone,
  };

  try {
    const usuario = await client.usuario.create({ data });
    const { password, confirmpassword, ...result } = usuario;

    ctx.body = {
      success: true,
      message: "Usuário criado com sucesso!",
      data: usuario,
    };
    ctx.status = 201;
  } catch (error) {
    // Verificando se o tipo de erro é do Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        if (error.meta?.target?.includes("cpf")) {
          // Violation de chave única para CPF
          ctx.body = {
            success: false,
            message: "Já existe um usuário com este CPF.",
          };
        } else if (error.meta?.target?.includes("email")) {
          // Violation de chave única para email
          ctx.body = {
            success: false,
            message: "Já existe um usuário com este e-mail.",
          };
        } else if (error.meta?.target?.includes("username")) {
          // Violation de chave única para username
          ctx.body = {
            success: false,
            message: "Já existe este nome de usuário.",
          };
        }
      } else {
        // Outro tipo de erro do Prisma
        ctx.body = {
          success: false,
          message: "Ocorreu um erro ao tentar criar o usuário.",
        };
      }
    } else {
      // Outro tipo de erro
      ctx.body = {
        success: false,
        message: "Ocorreu um erro desconhecido.",
      };
    }
    ctx.status = 201;
  }
};

export const editar = async (ctx) => {
  const data = {
    nome: ctx.request.body.nome,
    cpf: ctx.request.body.cpf,
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    tipo: ctx.request.body.tipo,
    permissao: ctx.request.body.permissao,
    telefone: ctx.request.body.telefone,
  };
  try {
    const usuario = await client.usuario.update({
      where: {
        id: ctx.params.id,
      },
      data,
    });

    ctx.body = {
      success: true,
      message: "Usuário alterado com sucesso!",
      data: usuario,
    };
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      success: false,
      message: "Erro ao atualizar usuário.",
      error: error.message,
    };
    ctx.status = 500;
  }
};

export const deletar = async (ctx) => {
  try {
    const usuario = await client.usuario.delete({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.body = {
      success: true,
      message: "Usuário excluído com sucesso!",
      data: usuario,
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

export const buscar = async (ctx) => {
  let params = ctx.params;
  try {
    const usuario = await client.usuario.findUnique({
      where: {
        id: params.id,
      },
    });

    ctx.body = {
      success: true,
      data: usuario,
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

export const buscarPorEmail = async (ctx) => {
  const email = ctx.params.email;
  try {
    const usuario = await client.usuario.findUnique({
      where: {
        email: email,
      },
    });

    ctx.body = {
      success: true,
      data: usuario,
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

export const listar = async (ctx) => {
  try {
    const usuarios = await client.usuario.findMany();

    ctx.body = {
      success: true,
      data: usuarios,
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

export const login = async (ctx) => {
  const [type, token] = ctx.headers.authorization.split(" ");

  const decodedToken = Buffer.from(token, "base64").toString("utf-8");
  const [email, plainTextPassword] = decodedToken.split(":");

  const usuario = await client.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    ctx.body = {
      success: false,
      message: "E-mail incorreto!",
    };
    ctx.status = 201;
    return;
  }

  const passwordMatch = await bcrypt.compare(
    plainTextPassword,
    usuario.password
  );

  if (!passwordMatch) {
    ctx.body = {
      success: false,
      message: "Senha incorreta!",
    };
    ctx.status = 201;
    return;
  }

  const { password, ...result } = usuario;

  const accessToken = jwt.sign(
    {
      userId: usuario.id,
      nome: usuario.nome,
    },
    process.env.JWT_SECRET,
    { expiresIn: 30000 }
  );
  ctx.body = {
    success: true,
    usuario: result,
    accessToken,
  };
};

export const requestRenewToken = async (ctx) => {
  const { email } = ctx.request.body;

  try {
    const usuario = await client.usuario.findUnique({ where: { email } });
    if (!usuario) {
      ctx.status = 404;
      ctx.body = { error: "Usuário não encontrado com o e-mail fornecido!" };
      return;
    }

    // Gerar um token de 6 dígitos
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 3600000); // 1 hora no futuro

    await client.usuario.update({
      where: { email },
      data: {
        reset_token: token,
        reset_token_expiry: expiry,
      },
    });

    ctx.request.body = {
      subject: "Redefinição de Senha",
      body: `Você solicitou uma redefinição de senha. Use este token para redefinir sua senha: ${token}`,
      from: "comunicados@performance.goiania.br",
      to: email,
    };

    try {
      await sendMailMiddleware(ctx, async () => {});
      ctx.status = 200;
      ctx.body = { message: "Token de redefinição enviado para o e-mail" };
    } catch (emailError) {
      ctx.status = 500;
      ctx.body = {
        error:
          "Erro ao enviar o e-mail. Por favor, tente novamente mais tarde.",
      };
    }
  } catch (dbError) {
    ctx.status = 500;
    ctx.body = {
      error:
        "Erro interno ao processar a solicitação. Por favor, tente novamente mais tarde.",
    };
  }
};

export const verifyToken = async (ctx) => {
  const { email, token } = ctx.request.body;
  try {
    const usuario = await client.usuario.findFirst({
      where: {
        email,
        reset_token: token,
        reset_token_expiry: {
          gte: new Date(),
        },
      },
    });

    if (!usuario) {
      ctx.status = 400;
      ctx.body = { error: "Token inválido ou expirado" };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: "Token verificado com sucesso" };
  } catch (dbError) {
    ctx.status = 500;
    ctx.body = { error: "Token Inválido." };
  }
};

export const renewPassword = async (ctx) => {
  const { token, newPassword } = ctx.request.body;

  const usuario = await client.usuario.findFirst({
    where: {
      reset_token: token,
      reset_token_expiry: {
        gte: new Date(),
      },
    },
  });

  if (!usuario) {
    ctx.status = 400;
    ctx.body = { error: "Token inválido ou expirado" };
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await client.usuario.update({
    where: { id: usuario.id },
    data: {
      password: hashedPassword,
      confirmpassword: hashedPassword,
      reset_token: null,
      reset_token_expiry: null,
    },
  });

  ctx.status = 200;
  ctx.body = { message: "Senha redefinida com sucesso" };
};
