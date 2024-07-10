import React, { useState, useCallback, useEffect } from "react";
import util from "../../../services/util";
import { PDefaultModal, PSubmitButton, PSuccessModal } from "../..";
import { Formik, Form } from "formik";
import * as yup from "yup";
import SubscribeForm from "./SubscribeForm";
import api from "../../../services/api";
import messages from "../../../services/messages";
import { useSendMail } from "../../../hooks";
import {
  subClientText,
  subPerfText,
} from "../../../lib/texts/emails/mailTexts";

const conditionalValidation = (type) =>
  yup.string().when("typeDocument", {
    is: type,
    then(schema) {
      return schema.required("Campo obrigatório");
    },
  });

const validationSchema = yup.object().shape({
  nivelId: yup.string().required("Campo obrigatório"),
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  telefone: yup
    .string()
    .matches(/^\d{10,11}$/, "Telefone inválido")
    .required("Campo obrigatório")
    .transform((value, originalValue) => originalValue.replace(/[^\d]/g, "")),
  typeDocument: yup.string().required("Campo obrigatório"),
  cnpj: yup.string().when("typeDocument", {
    is: "1",
    then(schema) {
      return schema
        .min(18, "O CNPJ deve conter 14 dígitos")
        .required("Campo obrigatório");
    },
  }),
  unidadegestora: conditionalValidation("1"),
  cpf: yup.string().when("typeDocument", {
    is: "2",
    then(schema) {
      return schema
        .test("validate-cpf", "CPF inválido", (value) => util.validarCpf(value))
        .required("Campo obrigatório");
    },
  }),
  cep: yup.string().when("typeDocument", {
    is: "2",
    then(schema) {
      return schema
        .min(10, "O CEP deve conter 8 dígitos")
        .required("Campo obrigatório");
    },
  }),
  estado: conditionalValidation("2"),
  municipio: conditionalValidation("2"),
  endereco: conditionalValidation("2"),
  bairro: conditionalValidation("2"),
});

const Subscribe = ({ isOpen, onClose, initialValues }) => {
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [subscribe, setSubscribe] = useState({});

  const { sendEmail } = useSendMail();

  async function sendResponse() {
    const clientConfirm = {
      subject: `Confirmação de Inscrição - ${subscribe.curso.courseTitle}`,
      body: subClientText(subscribe),
      from: "cursos.performance@performance.goiania.br",
      to: subscribe.email,
    };

    const performanceConfirm = {
      subject: `Nova Inscrição - ${subscribe.curso.courseTitle}`,
      body: subPerfText(subscribe),
      from: "noreply-cursos@performance.goiania.br",
      to: "contact.wolf.agency@gmail.com",/* administrativo@performance.goiania.br */
    };

    await sendEmail(clientConfirm);
    await sendEmail(performanceConfirm);
  }

  useEffect(() => {
    if (isOpenSuccess) sendResponse();
  }, [isOpenSuccess]);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const res = await api.post("/inscricao", values);
        if (res.data.success) {
          setSubscribe(values);
          setIsOpenSuccess(true);
          onClose();
        } else {
          messages.mensagem.erro(
            "Erro ao enviar inscrição, tente novamente mais tarde."
          );
        }
      } catch (error) {
        messages.mensagem.erro(
          "Erro ao enviar inscrição, tente novamente mais tarde."
        );
      }
    },
    [onClose]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => (
        <>
          <Form>
            <PDefaultModal
              isOpen={isOpen}
              onClose={onClose}
              title={"Inscrição"}
              footer={
                <PSubmitButton
                  disabled={!formik.isValid || formik.isSubmitting}
                  onClick={formik.handleSubmit}
                  buttonTitle={formik.isSubmitting ? "Carregando..." : "Enviar"}
                  bgColor="green-600"
                  bgHoverColor="green-700"
                  width="md:w-1/2 lg:w-1/4 xl:w-1/6"
                />
              }
            >
              <SubscribeForm />
            </PDefaultModal>
            <PSuccessModal
              title="Inscrição realizada com sucesso!"
              message="Obrigado por se inscrever. Você receberá um e-mail com os detalhes da sua inscrição em breve. Nossa equipe está à disposição para qualquer dúvida."
              isOpen={isOpenSuccess}
              setIsOpen={setIsOpenSuccess}
              autoCloseTime={3000}
            />
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Subscribe;

/* const clientEmailContent = mailTemplate({
  title: "Obrigado pelo contato!",
  saudation: `Prezado(a) senhor(a), ${subscribe.nome}`,
  content: `
  Espero que este e-mail o(a) encontre bem.
  Gostaríamos de confirmar que recebemos a sua inscrição para o curso: "${subscribe?.curso?.courseTitle}", oferecido pela Performance.
  Estamos muito satisfeitos com o seu interesse em aprimorar suas habilidades e conhecimentos através da nossa empresa.

  Abaixo estão alguns detalhes importantes sobre o curso:
  Data Inicial: ${subscribe.curso ? util.getDateView(subscribe?.curso?.courseStart?.toString()) : ''}
  Data Final: ${subscribe.curso ? util.getDateView(subscribe?.curso?.courseEnd?.toString()) : ''}
  Endereço: ${subscribe?.curso?.courseAddress}
  Cidade: ${subscribe?.curso?.courseCity}/${subscribe?.curso?.courseUf}

  Estamos à disposição para responder a quaisquer perguntas ou fornecer informações adicionais que você possa precisar. Aguardamos ansiosamente a sua participação e esperamos que este curso seja uma experiência enriquecedora para o seu desenvolvimento profissional.

  Já nos segue nas redes sociais?
  Se não, clique em alguns dos links abaixo e acompanhe nossas novidades!!
  `,
  signature: "Atenciosamente,<br>Equipe Performance",
})

const performanceEmailContent = mailTemplate({
  title: "Contato do Usuário!",
  saudation: `Atenção, setor administrativo!`,
  content: `
  Prezados Administradores,

  Gostaríamos de informá-los que um usuário se inscreveu no curso: "${subscribe?.curso?.courseTitle}".
  Abaixo estão os detalhes da inscrição efetuada:

  Nome: ${subscribe.nome}
  Documento: ${subscribe.cpf || subscribe.cnpj}
  Data de Início e Fim: ${subscribe.curso ? util.getDateView(subscribe?.curso?.courseStart?.toString()) : ''} - ${subscribe.curso ? util.getDateView(subscribe?.curso?.courseEnd?.toString()) : ''}
  Endereço: ${subscribe?.curso?.courseAddress}
  Cidade: ${subscribe?.curso?.courseCity}/${subscribe?.curso?.courseUf}

  Revisem os dados e tomem as ações necessárias.
  `,
  signature: "Obrigado!!",
}) */
