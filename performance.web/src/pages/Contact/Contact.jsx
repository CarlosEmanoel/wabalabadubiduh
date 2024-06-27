import React, { useState } from "react";
import api from "../../services/api";
import util from "../../services/util";
import { PDefaultContainer, PSuccessModal } from "../../components";
import { useSendMail } from "../../hooks";
import { mailTemplate } from "../../lib/texts/emails/mailTemplate";

const Contact = () => {
  const initial = {
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  };

  const validate = () => {
    if (contato.nome === "") return false;

    if (contato.email === "") return false;

    if (contato.telefone === "") return false;

    if (contato.assunto === "") return false;

    if (contato.mensagem === "") return false;

    return true;
  };

  const [contato, setContato] = useState(initial);
  const [sucesso, setSucesso] = useState("");
  const [isOpenSuccess, setIsOpenSuccess] = useState("");
  const [erro, setErro] = useState("");

  const year = util.getCurrentYear();
  const fullDateTime = util.getFullDateTime()

  const valorContato = (e) => {
    let { name, value } = e.target;

    if (name === "telefone") {
      let nValue = util.mask("telefone", value);
      setContato({ ...contato, [name]: nValue });
    } else {
      setContato({ ...contato, [e.target.name]: e.target.value });
    }
  };

  const { sendEmail } = useSendMail();

  const clientEmailContent = mailTemplate({
    title: "Obrigado pelo contato!",
    saudation: `Prezado, ${contato.nome}`,
    content: `
    Agradecemos imensamente pelo seu contato. Sua mensagem foi recebida com sucesso e estamos analisando todas as informações fornecidas.

    Nosso compromisso é atender às suas necessidades com a maior brevidade possível. Em breve, entraremos em contato com as respostas e soluções que você precisa.

    Agradecemos novamente pela confiança e por entrar em contato conosco.

    Já nos segue nas redes sociais?
    Se não, clique em alguns dos links abaixo e acompanhe nossas novidades!!
    `,
    signature: "Atenciosamente,<br>Equipe Performance Goiânia",
    year: year
  })

  const performanceEmailContent = mailTemplate({
    title: "Contato do Usuário!",
    saudation: `Atenção, setor administrativo!`,
    content: `
    Prezados Administradores,

    Gostaríamos de informá-los que um usuário deixou uma nova mensagem em nosso site. Abaixo estão os detalhes da mensagem recebida:

    Detalhes da Mensagem:

    Usuário: ${contato.nome}
    Email: ${contato.email}
    Data e hora: ${fullDateTime}
    Conteúdo da Mensagem:
    ${contato.mensagem}

    Revisem a mensagem e tomem as ações necessárias.
    `,
    signature: "Atenciosamente,<br>Desenvolvimento e Suporte,<br>Performance Goiânia",
    year: year
  })

  async function sendResponse(values) {
    const clientConfirm = {
      subject: "Confirmação de Contato",
      body: clientEmailContent,
      from: "teste-template@performance.goiania.br",
      to: values.email,
    };
    const performanceConfirm = {
      subject: `Solicitação de Contato - ${values.assunto}`,
      body: performanceEmailContent,
      from: "teste-sem-template@performance.goiania.br",
      to: "contact.wolf.agency@gmail.com",
    };

    await sendEmail(clientConfirm);
    await sendEmail(performanceConfirm);
  }

  const sendMensagem = (e) => {
    e.preventDefault();

    if (validate()) {
      api
        .post("/contato", contato)
        .then((response) => {
          if (response.data.success === true) {
            sendResponse(contato)
            setErro("");
            setIsOpenSuccess(true)
            setSucesso(response.data.message);
            setContato(initial);
          } else {
            setSucesso("");
            setErro(response.data.message);
          }
        })
        .catch((error) => {
          setSucesso("");
          if (error.data) setErro(error.data.message);
          else setErro("Ocorreu um erro! Tente novamente mais tarde.");
        });
    } else {
      setSucesso("");
      setErro("Por favor, preencha todos os campos!");
    }
  };

  return (
    <PDefaultContainer>
      <div className="col-md-6 my-2 bg-gray-100 flex flex-col justify-center text-center text-xl">
        <h2 className="mb-5 text-sky-500 text-xl">Entre em contato! </h2>
        <p className="text-[20px]">
          <i className="bi bi-telephone-fill me-2"></i>(62) 99942-8364
        </p>
        <p className="text-[20px]">
          <i className="bi bi-geo-alt-fill me-2"></i>Avenida Olinda, n° 960 -
          Park Lozandes - Torre 01, Sala 608 B - Edifício Lozandes - Goiânia/GO
          - Cep: 74884-120
        </p>
        {erro !== "" && (
          <div className="text-red-500 w-64 mx-auto border-solid border-2 border-red-500 bg-red-100 rounded">
            {erro}
          </div>
        )}{" "}
        <br />
        {sucesso !== "" && (
          <div className="text-green-800 mx-auto w-64 border-solid border-2 border-green-500 bg-green-100 rounded">
            {sucesso}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <div className="my-2 bg-gray-100 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <img
              src={`${process.env.REACT_APP_NODE_URL}/image/logo.png`}
              className="mx-auto h-14  mt-5 w-auto"
            />
          </div>
          <div className="max-w-md w-full mx-auto mt-4 mb-5 rounded-md bg-white p-8 border border-gray-600 flex flex-col justify-center items-center">
            <form className="space-y-8 w-11/12" onSubmit={sendMensagem}>
              <div>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Nome*"
                  value={contato.nome}
                  onChange={valorContato}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="E-mail*"
                  value={contato.email}
                  onChange={valorContato}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={contato.telefone}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Telefone*"
                  onChange={valorContato}
                  maxLength={14}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={contato.assunto}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Assunto"
                  onChange={valorContato}
                />
              </div>
              <div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  name="mensagem"
                  id="mensagem"
                  cols="30"
                  rows="10"
                  value={contato.mensagem}
                  placeholder="Mensagem"
                  onChange={valorContato}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
      <PSuccessModal
        title="Contato enviado com sucesso!"
        message="Em breve você receberá um e-mail confirmando o contato."
        isOpen={isOpenSuccess}
        setIsOpen={setIsOpenSuccess}
        autoCloseTime={5000}
      />
    </PDefaultContainer>
  );
};

export default Contact;

/* 

<!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
      </head>

      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">

          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
              <tr>
                  <td align="center" bgcolor="#007BFF" style="padding: 40px 0;">
                      <h1 style="color: #ffffff; margin: 0;">Bem-vindo!</h1>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                      <h2 style="color: #333333;">Olá,</h2>
                      <p style="color: #666666; line-height: 1.6;">
                          Obrigado por se inscrever em nosso serviço. Estamos entusiasmados em tê-lo a bordo! 
                          Aqui estão alguns detalhes importantes que você precisa saber para começar:
                      </p>
                      <ul style="color: #666666; line-height: 1.6;">
                          <li><strong>Acesso ao painel:</strong> Use seu email e senha para acessar nosso painel.</li>
                          <li><strong>Suporte:</strong> Nossa equipe de suporte está disponível 24/7 para ajudá-lo.</li>
                          <li><strong>Recursos:</strong> Explore nossa base de conhecimento para tirar o máximo proveito do nosso serviço.</li>
                      </ul>
                      <p style="color: #666666; line-height: 1.6;">
                          Se você tiver alguma dúvida, não hesite em entrar em contato conosco.
                      </p>
                      <p style="color: #666666; line-height: 1.6;">Atenciosamente,<br>Equipe de Suporte</p>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#007BFF" style="padding: 20px 30px 20px 30px;">
                      <p style="color: #ffffff; text-align: center; margin: 0;">&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
                  </td>
              </tr>
          </table>

      </body>

      </html>

*/