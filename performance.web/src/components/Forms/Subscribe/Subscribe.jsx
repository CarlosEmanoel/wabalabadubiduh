import React, { useState, useCallback } from "react";
import util from "../../../services/util";
import { PDefaultModal, PSubmitButton, PSuccessModal } from "../..";
import { Formik, Form } from "formik";
import * as yup from "yup";
import SubscribeForm from "./SubscribeForm";
import api from "../../../services/api";
import messages from "../../../services/messages";
import { useSendMail } from "../../../hooks";

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

  const { sendEmail } = useSendMail();

  async function sendResponse(values) {
    const emailData = {
      subject: "Confirmação de Inscrição",
      body: `
            Olá ${values.nome},
  
            Parabéns! Sua inscrição foi realizada com sucesso. Seguem abaixo os detalhes da sua inscrição:
  
            Nome: ${values.nome}
            E-mail: ${values.email}
            Telefone: ${values.telefone}
            CNPJ: ${values.cnpj}
            Unidade Gestora: ${values.unidadegestora}
            Cargo: ${values.cargo}
            Endereço: ${values.endereco}
            Bairro: ${values.bairro}
            Município: ${values.municipio}
            Estado: ${values.estado}
            CEP: ${values.cep}
  
            Estamos entusiasmados por tê-lo(a) em nosso curso e esperamos que esta experiência seja enriquecedora e gratificante.
  
            Em breve, enviaremos mais informações sobre o curso e outras orientações importantes. Caso tenha alguma dúvida, não hesite em nos contatar através deste e-mail.
  
            Agradecemos a sua inscrição!
  
            Atenciosamente,
            Equipe Performance Goiânia
        `,
      from: "inscricao@performance.goiania.br",
      to: values.email,
    };
    await sendEmail(emailData);
  }

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const res = await api.post("/inscricao", values);
        if (res.data.success) {
          sendResponse(values);
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
              width={
                "w-2/3"
              } /* lembrar de mudar isso e deixar o modal mais responsivo */
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
              autoCloseTime={8000}
            />
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Subscribe;
