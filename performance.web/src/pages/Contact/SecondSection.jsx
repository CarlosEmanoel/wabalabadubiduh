import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  PSubmitButton,
  PFileFetcher,
  PInputField,
  PSectionContainer,
  PSuccessModal,
} from "../../components";
import api from "../../services/api";
import messages from "../../services/messages";
import util from "../../services/util";
import { Link } from "react-router-dom";
import { useSendMail } from "../../hooks";
import { mailTemplate } from "../../lib/texts/emails/mailTemplate";

const validationSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Informe seu e-mail"),
  telefone: yup
    .string()
    .matches(/^\d{10,11}$/, "Telefone inválido")
    .required("Campo obrigatório")
    .transform((value, originalValue) => originalValue.replace(/[^\d]/g, "")),
  mensagem: yup.string().required("Campo obrigatório"),
});

const initialValues = {
  nome: "",
  email: "",
  telefone: "",
  assunto: "",
  mensagem: "",
};

const contacts = [
  {
    icon: "ic_tecnology_phone_filled",
    title: "Nosso Endereço",
    text: "Avenida Olinda, n° 960 - Park Lozandes - Torre 01, Sala 608 B - Edifício Lozandes - Goiânia/GO - Cep: 74884-120",
  },
  {
    icon: "ic_app_mail_filled",
    title: "Nosso E-mail",
    text: "administrativo@performance.goiania.br",
  },
  {
    icon: "ic_file_newspaper_filled",
    title: "Nosso Telefone",
    text: "(62) 9 9942-8364",
  },
];

const socialLinks = [
  {
    icon: "ic_social_facebook_filled",
    link: "https://www.facebook.com/performancegoiania",
    title: "Facebook",
  },
  {
    icon: "ic_social_instagram_filled",
    link: "https://www.instagram.com/performancegoiania",
    title: "Instagram",
  },
  {
    icon: "ic_social_whatsapp_filled",
    link: "https://api.whatsapp.com/send/?phone=5562999428364&text&type=phone_number&app_absent=0",
    title: "Whatsapp",
  },
];

const fullDateTime = util.getFullDateTime()

function SecondSection() {
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [contact, setContact] = useState({});

  const { sendEmail } = useSendMail();

  const clientEmailContent = mailTemplate({
    title: "Obrigado pelo contato!",
    saudation: `Prezado, ${contact.nome}`,
    content: `
    Agradecemos imensamente pelo seu contato. Sua mensagem foi recebida com sucesso e estamos analisando todas as informações fornecidas.

    Nosso compromisso é atender às suas necessidades com a maior brevidade possível. Em breve, entraremos em contato com as respostas e soluções que você precisa.

    Agradecemos novamente pela confiança e por entrar em contato conosco.

    Já nos segue nas redes sociais?
    Se não, clique em alguns dos links abaixo e acompanhe nossas novidades!!
    `,
    signature: "Atenciosamente,<br>Equipe Performance Goiânia",
  })

  const performanceEmailContent = mailTemplate({
    title: "Contato do Usuário!",
    saudation: `Atenção, setor administrativo!`,
    content: `
    Prezados Administradores,

    Gostaríamos de informá-los que um usuário deixou uma nova mensagem em nosso site. Abaixo estão os detalhes da mensagem recebida:

    Detalhes da Mensagem:

    Usuário: ${contact.nome}
    Email: ${contact.email}
    Data e hora: ${fullDateTime}
    Conteúdo da Mensagem:
    ${contact.mensagem}

    Revisem a mensagem e tomem as ações necessárias.
    `,
    signature: "Atenciosamente,<br>Desenvolvimento e Suporte,<br>Performance Goiânia",
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

  const onSubmit = async (values, { resetForm }) => {
    try {
      await api.post("/contato", values);
      setContact(values);
      setTimeout(() => {
      sendResponse(values);
      }, 150)
      setIsOpenSuccess(true);
      resetForm();
    } catch (error) {
      console.log(error);
      messages.mensagem.erro(
        error.response
          ? error.response.data.message
          : "Ocorreu um erro, tente novamente mais tarde!"
      );
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <PSectionContainer full>
              <div className="flex max-w-full justify-center items-center -mt-40 md:-mt-60">
                <div className="flex flex-col sm:flex-row w-[75%] mx-auto transition-all ease-in-out duration-500 shadow-2xl z-10">
                  <div className="w-full justify-center lg:flex flex-1 flex-col shadow-lg bg-secondary_blue text-white p-10 min-w-screen transition-all ease-in-out duration-500 sm:rounded-tl-lg sm:rounded-bl-lg hidden">
                    <div className="pb-6">
                      <span className="text-lg md:text-xl lg:text-2xl font-bold">
                        Contatos
                      </span>
                      <p className="mt-1 font-semibold">
                        Utilize qualquer um dos meios abaixo para nos contatar:
                      </p>
                    </div>
                    <div>
                      {contacts.map((contact) => (
                        <div className="flex flex-row gap-4 mb-6">
                          <div className="w-[9%] flex justify-center items-center">
                            <span className="flex justify-center items-center h-14 w-14 place-items-center rounded-full bg-primary_blue">
                              <PFileFetcher
                                width={40}
                                height={40}
                                fileName={contact.icon}
                                alt={contact.title}
                                className={"brightness-200 saturate-0 mix-blend-plus-lighter"}
                              />
                            </span>
                          </div>
                          <div className="w-[89%]">
                            <span className="font-bold">{contact.title}</span>
                            <p className="font-thin">{contact.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t-2 border-white mt-6">
                      <div className="font-bold my-4">Nossas Redes Sociais</div>
                      <div className="flex flex-row gap-4">
                        {socialLinks.map((social) => (
                          <Link
                            className="grid h-12 w-12 place-items-center rounded-full bg-primary_blue"
                            to={social.link}
                            target="_blank"
                          >
                            <PFileFetcher
                              width={40}
                              height={40}
                              fileName={social.icon}
                              alt={social.title}
                              className={"brightness-200 saturate-0 mix-blend-plus-lighter"}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex px-5 w-[75vw] sm:flex rounded-lg lg:rounded-l-none flex-1 flex-col items-center justify-center shadow-lg bg-white p-4 min-w-screen transition-all ease-in-out duration-500 md:py-12">
                    <div className="py-2 flex flex-col gap-4">
                      <span className="mb-8 text-lg md:text-xl lg:text-2xl font-bold text-center transition-all ease-in-out duration-500">
                        Envie sua mensagem
                      </span>
                    </div>
                    <PInputField
                      name="nome"
                      label="Seu Nome"
                      placeholder="Digite seu nome"
                    />
                    <PInputField
                      name="email"
                      label="Seu E-mail"
                      placeholder="Digite seu e-mail"
                    />
                    <PInputField
                      name="telefone"
                      type="telefone"
                      label="Seu Telefone"
                      placeholder="Digite seu número para contato"
                    />
                    <PInputField
                      name="assunto"
                      label="Assunto"
                      placeholder="Digite o assunto da mensagem"
                      optional
                    />
                    <PInputField
                      name="mensagem"
                      type="textarea"
                      label="Sua Mensagem"
                      rows={6}
                      placeholder="Digite sua mensagem"
                    />
                    <PSubmitButton
                      disabled={!formik.isValid || formik.isSubmitting}
                      onClick={() => { }}
                      buttonTitle={
                        formik.isSubmitting ? "Carregando..." : "Enviar"
                      }
                    />
                  </div>
                </div>
              </div>
            </PSectionContainer>
          </Form>
        )}
      </Formik>
      <PSuccessModal
        title="Mensagem Enviada com Sucesso!"
        message="Agradecemos por entrar em contato conosco. Nossa equipe enviará um e-mail de confirmação em breve e retornará com uma resposta o mais rápido possível."
        isOpen={isOpenSuccess}
        setIsOpen={setIsOpenSuccess}
        autoCloseTime={5000}
      />
    </>
  );
}

export default SecondSection;
