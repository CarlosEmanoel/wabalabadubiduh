import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { PFileFetcher, PInputFloatingLabel } from "../../components";
import api from "../../services/api";
import messages from "../../services/messages";
import util from "../../services/util";
import { useNavigate } from "react-router-dom";
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

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await api.post("/usuario", values);
      navigate("/cadastro-efetuado");
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="flex h-screen fixed w-screen justify-center items-center overflow-hidden bg-black bg-opacity-95">
            <div
              className="w-[110vw] h-[110vh] absolute -z-10 bg-center bg-cover bg-no-repeat blur-sm bg-opacity-50"
              id="background-1"
            />
            <div
              className="w-[110vw] h-[110vh] absolute -z-10 bg-center bg-cover bg-no-repeat blur-sm bg-opacity-50"
              id="background-2"
            />
            <div
              className="w-[110vw] h-[110vh] absolute -z-10 bg-center bg-cover bg-no-repeat blur-sm bg-opacity-50"
              id="background-3"
            />
            <div className="flex flex-col sm:flex-row w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl mx-auto transition-all ease-in-out duration-500 shadow-2xl">
              <div className="w-full px-2 border border-slate-400 rounded-lg bg-white h-1/2">
                <div className="w-full pt-2 flex items-center">
                  <a
                    href="/acesso"
                    className="pb-4 flex font-semibold self-start md:hidden left-0"
                  >
                    <PFileFetcher fileName="ic_arrow_caret_left_filled" />{" "}
                    <p>Voltar</p>
                  </a>
                </div>
                <div className="py-2 hidden md:flex flex-col">
                  <PFileFetcher
                    className="hidden lg:flex w-44"
                    fileName="performance-brand-maximized"
                    alt="Logo da Performance"
                  />
                  <h2 className="text-xl font-semibold text-gray-700 py-2 text-center border-b-2 border-gray-200 rounded-t-lg">
                    Cadastre-se
                  </h2>
                </div>
                <div className="overflow-y-auto max-h-[60vh] h-auto px-4">
                  <div className="flex w-full flex-col md:flex-row md:gap-10">
                    <div className="w-full mt-2">
                      <PInputFloatingLabel name="nome" label="Nome Completo" />
                    </div>
                    <div className="w-full mt-2 md:w-2/5">
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
                        icName="ic_app_mail_filled"
                      />
                    </div>
                    <div className="pt-2 md:w-1/2">
                      <PInputFloatingLabel
                        name="telefone"
                        type="telefone"
                        label="Seu Telefone"
                        showIcon
                        icName="ic_tecnology_phone_filled"
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col md:flex-row md:gap-10 ">
                    <div className="pt-2 md:w-1/3">
                      <PInputFloatingLabel
                        name="username"
                        label="Seu Usuário"
                        showIcon
                        icName="ic_people_person_filled"
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
                    <a
                      className="outline-none no-underline cursor-pointer text-cyan-800 hover:text-cyan-500"
                      href="/acesso"
                    >
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
};

export default SignUp;
