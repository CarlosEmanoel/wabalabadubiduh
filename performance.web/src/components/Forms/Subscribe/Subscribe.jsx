import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import api from "../../../services/api";
import util from "../../../services/util";
import { PDefaultModal, PSuccessModal } from "../..";
import { Formik, Form } from "formik";
import * as yup from "yup";
import useSendEmail from "../../../hooks/responses/useSendEmail";
import SubscribeForm from "./SubscribeForm";
import messages from "../../../services/messsages";

const conditionalValidation = (type) =>
  yup.string().when("typeDocument", {
    is: type,
    then(schema) {
      return schema.required("Campo obrigatório");
    },
  });

const validationSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
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

  //   const { sendEmail, success } = useSendEmail();
  //   const emailData = {
  //     subject: "Confirmação de Inscrição",
  //     body: `
  //         Olá ${inscricao.nome},

  //         Parabéns! Sua inscrição foi realizada com sucesso. Seguem abaixo os detalhes da sua inscrição:

  //         Nome: ${inscricao.nome}
  //         E-mail: ${inscricao.email}
  //         Telefone: ${inscricao.telefone}
  //         CNPJ: ${inscricao.cnpj}
  //         Unidade Gestora: ${inscricao.unidadegestora}
  //         Cargo: ${inscricao.cargo}
  //         Endereço: ${inscricao.endereco}
  //         Bairro: ${inscricao.bairro}
  //         Município: ${inscricao.municipio}
  //         Estado: ${inscricao.estado}
  //         CEP: ${inscricao.cep}

  //         Estamos entusiasmados por tê-lo(a) em nosso curso e esperamos que esta experiência seja enriquecedora e gratificante.

  //         Em breve, enviaremos mais informações sobre o curso e outras orientações importantes. Caso tenha alguma dúvida, não hesite em nos contatar através deste e-mail.

  //         Agradecemos a sua inscrição!

  //         Atenciosamente,
  //         Equipe Performance Goiânia
  //     `,
  //     from: "inscricao@performance.goiania.br",
  //     to: inscricao.email,
  //   };
  //   async function sendResponse() {
  //     await sendEmail(emailData);
  //     console.log(success);
  //   }

  const handleSubmit = useCallback(
    async (values) => {
      let API_ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

      if (process.env.NODE_ENV === "production") {
        API_ENDPOINT = "https://expansaodigital.tec.br/performance.api";
      }
      try {
        const res = await axios.post(`${API_ENDPOINT}/inscricao`, values);

        if (res.data.success) {
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
                <button
                  type="button"
                  className="btn btn-success w-full md:w-1/2"
                  onClick={formik.handleSubmit}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Enviar
                </button>
              }
            >
              <SubscribeForm />
            </PDefaultModal>
            <PSuccessModal
              title="Inscrição realizada com sucesso!"
              message="Em breve você receberá um e-mail com as informações da sua inscrição."
              isOpen={isOpenSuccess}
              setIsOpen={setIsOpenSuccess}
              autoCloseTime={5000}
            />
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Subscribe;
