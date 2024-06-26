import axios from "axios";

const sendMailMiddleware = async (ctx, next) => {
  console.log(ctx);
  const { subject, body, from, to, cc, bcc } = ctx.request.body;

  if (!subject || !body || !from || !to) {
    ctx.status = 400;
    ctx.body = { error: "Campos obrigatórios: subject, body, from, to" };
    return;
  }

  const emailData = {
    subject,
    body,
    from,
    to,
    cc: cc || [],
    bcc: bcc || [],
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  };

  try {
    const response = await axios.post(
      "https://api.smtplw.com.br/v1/messages",
      emailData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": process.env.SMTP_LOCAWEB_TOKEN,
        },
      }
    );

    ctx.status = 201;
    ctx.body = {
      message: "E-mail enviado com sucesso",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Erro ao enviar e-mail:",
      error.response ? error.response.data : error.message
    );
    ctx.status = error.response ? error.response.status : 500;
    ctx.body = { error: "Erro ao enviar e-mail" };
  }

  await next();
};

export default sendMailMiddleware;
