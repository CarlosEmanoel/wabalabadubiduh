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
import { Link } from "react-router-dom";

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

function SecondSection() {
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);

  const onSubmit = async (values, { resetForm }) => {
    try {
      await api.post("/contato", values);
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
            <PSectionContainer>
              <div className="flex max-h-2xl max-w-4xl justify-center items-center overflow-hidden -mt-40">
                <div className="flex flex-col sm:flex-row w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl mx-auto transition-all ease-in-out duration-500 shadow-2xl">
                  <div className="md:flex flex-1 flex-col shadow-lg bg-sky-300 text-blue-900 p-10 min-w-screen transition-all ease-in-out duration-500 sm:rounded-tl-lg sm:rounded-bl-lg hidden">
                    <div className="p-4">
                      <span className="text-lg md:text-xl lg:text-2xl font-bold">
                        Contatos
                      </span>
                      <p className="text-blue-900 mt-4">
                        Utilize qualquer um dos meios abaixo para nos contatar:
                      </p>
                    </div>
                    <div>
                      {contacts.map((contact) => (
                        <>
                          <div className="flex flex-row gap-4">
                            <span className="grid h-12 w-12 place-items-center rounded-full bg-blue-900">
                              <PFileFetcher
                                width={40}
                                height={40}
                                fileName={contact.icon}
                                alt={contact.title}
                              />
                            </span>
                            <div>
                              <span className="font-bold">{contact.title}</span>
                              <p>{contact.text}</p>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                    <div className="border-t-2 border-blue-400 mt-6">
                      <div className="font-bold my-4">Nossas Redes Sociais</div>
                      <div className="flex flex-row gap-4">
                        {socialLinks.map((social) => (
                          <Link
                            className="grid h-12 w-12 place-items-center rounded-full bg-blue-900"
                            to={social.link}
                          >
                            <PFileFetcher
                              width={40}
                              height={40}
                              fileName={social.icon}
                              alt={social.title}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex flex-1 flex-col items-center justify-center shadow-lg bg-white p-4 min-w-screen transition-all ease-in-out duration-500 rounded-lg md:rounded-br-lg md:rounded-tr-lg md:rounded-none md:py-12">
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
                      onClick={() => {}}
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
        autoCloseTime={8000}
      />
    </>
  );
}

export default SecondSection;
