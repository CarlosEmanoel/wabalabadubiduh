import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { PFileFetcher, PInputFloatingLabel } from "../../components";
import messages from "../../services/messsages";
import util from "../../services/util";
import "./SignUp.css";

const validationSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  cpf: yup
    .string()
    .test("validate-cpf", "CPF inválido", (value) => util.validarCpf(value))
    .required("Campo obrigatório"),
  username: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve conter, pelo menos, 6 caracteres")
    .required("Campo obrigatório"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem corresponder")
    .required("Campo obrigatório"),
  telefone: yup
    .string()
    .matches(/^\d{10,11}$/, "Telefone inválido")
    .required("Campo obrigatório")
    .transform((value, originalValue) => originalValue.replace(/[^\d]/g, "")),
});

function SignUp() {
  const navigate = useNavigate();

  const initialValues = {
    nome: "",
    cpf: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    tipo: "user",
    permissao: false,
    telefone: "",
  };

  const onSubmit = async (values) => {
    let API_ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

    if (process.env.NODE_ENV === "production") {
      API_ENDPOINT = "https://expansaodigital.tec.br/performance.api";
    }

    const res = await axios({
      method: "post",
      baseURL: API_ENDPOINT,
      url: "/usuario",
      data: values,
    });

    if (res.data.success === true) {
      navigate("/cadastro-efetuado");
    } else {
      messages.mensagem.erro(res.data.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="fixed flex items-center justify-center w-screen h-screen overflow-hidden bg-opacity-50">
            <div
              className="w-[110vw] h-[110vh] absolute -z-10 bg-center bg-cover bg-no-repeat"
              id="background-1"
            />
            <div
              className="w-[110vw] h-[110vh] absolute -z-10 bg-center bg-cover bg-no-repeat"
              id="background-2"
            />
            <div
              className="w-[110vw] h-[110vh] absolute -z-10 bg-center bg-cover bg-no-repeat"
              id="background-3"
            />
            <div className="mx-4 w-screen sm:w-2/3  md:w-3/4 lg:w-7/12 xl:max-w-3xl">
              <div className="w-full px-2 border border-slate-400 rounded-lg bg-white h-1/2 bg-opacity-0">
                <div>
                  <PFileFetcher
                    width="250"
                    fileName="public/images/performance-brand.svg"
                    alt="Logo da Performance"
                  />
                  <h2 className="text-xl font-semibold text-gray-700 py-2 text-center border-b-2 border-gray-200 rounded-t-lg">
                    Cadastre-se
                  </h2>
                </div>
                <div className="overflow-y-auto max-h-[60vh] h-auto px-4 pt-4">
                  <div className="flex w-full flex-col md:flex-row md:gap-10">
                    <div className="w-full">
                      <PInputFloatingLabel name="nome" label="Nome Completo" />
                    </div>
                    <div className="w-full md:w-2/5">
                      <PInputFloatingLabel
                        name="cpf"
                        type="cpf"
                        label="Seu CPF"
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col md:flex-row md:gap-10">
                    <div className="pt-2 md:w-1/2">
                      <PInputFloatingLabel
                        name="email"
                        label="Seu E-mail"
                        showIcon
                      />
                    </div>
                    <div className="pt-2 md:w-1/2">
                      <PInputFloatingLabel
                        name="telefone"
                        type="telefone"
                        label="Seu Telefone"
                        showIcon
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col md:flex-row md:gap-10 ">
                    <div className="pt-2 md:w-1/3">
                      <PInputFloatingLabel
                        name="username"
                        label="Seu Usuário"
                        showIcon
                      />
                    </div>
                    <div className="pt-2 md:w-1/3">
                      <PInputFloatingLabel
                        name="password"
                        type="password"
                        label="Sua Senha"
                      />
                    </div>
                    <div className="pt-2 md:w-1/3">
                      <PInputFloatingLabel
                        name="confirmpassword"
                        type="password"
                        label="Confirme Sua Senha"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center pt-4">
                  <button
                    className="w-full sm:w-11/12 md:w-72 text-white font-bold py-2 rounded text-sm sm:text-base transition-all ease-in-out duration-500 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-600"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Carregando..." : "Cadastrar"}
                  </button>
                  <span className="pt-2 pb-4 text-center text-sm sm:text-base">
                    Já possui uma conta? Efetue o{" "}
                    <a href="/login" className="outline-none">
                      login
                    </a>
                    .
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
