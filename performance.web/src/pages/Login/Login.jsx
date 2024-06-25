import axios from "axios";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import util from "../../services/util";
import { PSubmitButton, PDefaultModal, PFileFetcher, PInputCodeVerify, PInputFloatingLabel } from "../../components";
import "./Login.css";
import api from "../../services/api";

const validationSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup
    .string()
    .min(6, "A senha deve conter, pelo menos, 6 caracteres")
    .required("Digite sua senha"),
});

function Login() {
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const [tokenVerified, setTokenVerified] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    let API_ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

    if (process.env.NODE_ENV === "production") {
      API_ENDPOINT = "https://expansaodigital.tec.br/performance.api";
    }
    setErro("");

    try {
      const res = await axios({
        method: "post",
        baseURL: API_ENDPOINT,
        url: "/login",
        auth: {
          username: values.email,
          password: values.password,
        },
      });

      if (res.data.success === true) {
        util.setAuthToken(res.data.accessToken);
        // login efetuado com sucesso
        // guardar token no storage
        const tipo = res.data.usuario.tipo;
        if (tipo === "painel") {
          util.storage.setItem("uid", res.data.usuario.id);
          util.storage.setItem("t", "p");
          navigate("/painel");
        } else {
          util.storage.setItem("uid", res.data.usuario.id);
          util.storage.setItem("t", "u");
          // verificando se o usuário tem permissão de acesso
          navigate(res.data.usuario.permissao ? "/user" : "/cadastro-efetuado");
        }
      } else {
        // erro no login, mostrar mensagem de erro
        setErro(res.data.message);
      }
    } catch (error) {
      setErro("Erro ao tentar realizar login.");
    }
  };

  const requestToken = async () => {
    setErro("");
    try {
      await api.post(`/forgot-password`, { email });
      setStep(2);
      setTimer(180);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        }, 1000);
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErro(error.response.data.error);
      } else {
        setErro("Erro ao solicitar token de redefinição.");
      }
    }
  };

  const verifyToken = async (token) => {
    setErro("");
    try {
      await api.post(`/verify-token`, { email, token });
      setTokenVerified(true);
      setStep(3);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErro(error.response.data.error);
      } else {
        setErro("Token inválido ou expirado.");
      }
    }
  };

  const resetPassword = async (values) => {
    setErro("");
    try {
      await api.post(`/reset-password`, { token: values.token, newPassword: values.password });
      setPasswordModal(false);
      setErro("");
      setTokenVerified(false);
      setStep(1);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErro(error.response.data.error);
      } else {
        setErro("Erro ao redefinir senha.");
      }
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
                <div className="md:flex flex-1 flex-col items-center justify-center shadow-lg background-image p-4 min-w-screen transition-all ease-in-out duration-500 sm:rounded-tl-lg sm:rounded-bl-lg hidden">
                  <a href="/">
                    <PFileFetcher
                      fileName="performance-brand-maximized"
                      alt="Logo da Performance"
                      className="w-64"
                    />
                  </a>
                  <PFileFetcher
                    fileName="secure-login"
                    alt="Logo da Performance"
                    className="w-80"
                  />
                </div>
                <div className="flex sm:flex flex-1 flex-col items-center justify-center shadow-lg bg-white p-4 min-w-screen transition-all ease-in-out duration-500 rounded-lg md:rounded-br-lg md:rounded-tr-lg md:rounded-none py-12">
                  <a href="/" className="pb-4 flex font-semibold self-start md:hidden">
                    <PFileFetcher fileName="ic_arrow_caret_left_filled" /> <p>Voltar</p>
                  </a>
                  <span className="mb-8 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center transition-all ease-in-out duration-500">
                    Entre na sua conta
                  </span>
                  <div className="w-full">
                    <PInputFloatingLabel name="email" label="E-mail" showIcon />
                  </div>
                  <div className="w-full">
                    <PInputFloatingLabel
                      name="password"
                      type="password"
                      label="Senha"
                      showIcon
                    />
                  </div>
                  <div className="w-full flex flex-col items-center pt-4">
                    <PSubmitButton
                      disabled={!formik.isValid || formik.isSubmitting}
                      onClick={() => { }}
                      buttonTitle={formik.isSubmitting ? "Carregando..." : "Entrar"}
                    />
                    <span className="pt-2 pb-4 text-center text-sm sm:text-base">
                      Você pode também{" "}
                      <a onClick={() => setPasswordModal(true)} className="outline-none no-underline cursor-pointer text-cyan-800 hover:text-cyan-500">
                        redefinir sua senha
                      </a>{" "}
                      ou{" "}
                      <a className="outline-none no-underline cursor-pointer text-cyan-800 hover:text-cyan-500" href="/signup">
                        fazer cadastro
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
      <PDefaultModal isOpen={passwordModal} onClose={() => setPasswordModal(false)}>
        <div className="m-12 select-none">
          <h2 className="text-lg text-center font-bold">Redefinição de Senha</h2>
          {step === 1 && (
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-sm font-bold">Digite seu e-mail:</h2>
              <input
                type="email"
                className="w-64 p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PSubmitButton
                onClick={requestToken}
                buttonTitle={`Solicitar Token ${timer > 0 ? `(${timer}s)` : ""}`}
                disabled={!email || timer > 0}
              />
              {erro && <p className="text-red-500">{erro}</p>}
            </div>
          )}
          {step === 2 && (
            <>
              <h2 className="text-sm font-bold">Digite o Token:</h2>
              <PInputCodeVerify
                blocks={6}
                errorMessage={erro}
                onComplete={verifyToken}
                onResend={requestToken}
              />
            </>
          )}
          {step === 3 && (
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={yup.object({
                password: yup.string().min(6, "A senha deve conter, pelo menos, 6 caracteres").required("Digite sua nova senha"),
                confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem corresponder').required('Confirme sua nova senha'),
              })}
              onSubmit={resetPassword}
            >
              {(formik) => (
                <Form className="flex flex-col items-center space-y-4">
                  <div className="w-full">
                    <div className="my-4" />
                    <PInputFloatingLabel name="password" type="password" label="Nova Senha" showIcon />
                    <div className="my-4" />
                    <PInputFloatingLabel name="confirmPassword" type="password" label="Confirme a Nova Senha" showIcon />
                  </div>
                  <PSubmitButton
                    disabled={!formik.isValid || formik.isSubmitting}
                    onClick={() => { }}
                    buttonTitle={formik.isSubmitting ? "Carregando..." : "Redefinir Senha"}
                  />
                  {erro && <p className="text-red-500">{erro}</p>}
                </Form>
              )}
            </Formik>
          )}
        </div>
      </PDefaultModal>
    </>
  );
}

export default Login;
