import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./SignUp.css";

const validationSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  username: yup.string().required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve conter, pelo menos, 6 caracteres")
    .required("Campo obrigatório"),
  confirmpassword: yup.string().required("Campo obrigatório"),
  telefone: yup
    .string()
    .min(14, "Telefone inválido")
    .required("Campo obrigatório"),
});
const initial = process.env.NODE_ENV === "production" ? "/performance" : "";

function SignUp() {
  const navigate = useNavigate();
  const [erro, setErro] = useState("");

  const formik = useFormik({
    onSubmit: async (values) => {
      let API_ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

      if (process.env.NODE_ENV === "production") {
        API_ENDPOINT = "https://expansaodigital.tec.br/performance.api";
      }
      setErro("");

      const res = await axios({
        method: "post",
        baseURL: API_ENDPOINT,
        url: "/usuario",
        data: values,
      });

      if (res.data.success === true) {
        navigate("/cadastro-efetuado");
      } else {
        setErro(res.data.message);
      }
    },
    initialValues: {
      nome: "",
      cpf: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      tipo: "user",
      permissao: false,
      telefone: "",
    },
    validationSchema,
  });

  return (
    <div id="signup">
      <div className="container-signup">
        <form className="form-control" onSubmit={formik.handleSubmit}>
          <div className="title text-center">
            <h1>Cadastro de usuário</h1>
          </div>

          {erro != "" && (
            <div
              className="title"
              style={{
                border: "1px solid #000000",
                borderRadius: "12px",
                padding: "10px",
                backgroundColor: "#FEEFEF",
              }}
            >
              <h4>Erro</h4>
              {erro}
            </div>
          )}

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="nome">Nome completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome completo"
                error={formik.errors.nome}
                value={formik.values.nome}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.nome && (
                <span className="p-1 text-sm text-red-500">
                  {formik.errors.nome}
                </span>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="cpf">CPF</label>
              <InputMask
                type="text"
                id="cpf"
                name="cpf"
                placeholder="Digite seu CPF"
                required
                error={formik.errors.cpf}
                value={formik.values.cpf}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mask="999.999.999-99"
                maskChar={null}
              />
              {formik.errors.cpf && (
                <span className="p-2 text-sm text-red-500">
                  {formik.errors.cpf}
                </span>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="email">Seu email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Digite seu email"
                error={formik.errors.email}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && (
                <span className="p-2 text-sm text-red-500">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="username">Seu usuário</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Digite um usuário"
                error={formik.errors.username}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.username && (
                <span className="p-2 text-sm text-red-500">
                  {formik.errors.username}
                </span>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="password">Digite sua senha</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                error={formik.errors.password}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && (
                <span className="p-2 text-sm text-red-500">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="confirmpassword">Confirme a senha</label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirme sua senha"
                error={formik.errors.confirmpassword}
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.confirmpassword && (
                <span className="p-2 text-sm text-red-500">
                  {formik.errors.confirmpassword}
                </span>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="telefone">Telefone</label>
              <InputMask
                mask={"(99) 99999-9999"}
                maskChar={null}
                alwaysShowMask={false}
                type="text"
                id="telefone"
                name="telefone"
                placeholder="Digite seu telefone"
                required
                error={formik.errors.telefone}
                value={formik.values.telefone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.telefone && (
                <span className="p-2 text-sm text-red-500">
                  {formik.errors.telefone}
                </span>
              )}
            </div>
          </div>

          <div id="botao" className="button">
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? "Carregando..." : "Criar minha conta "}
            </button>
            <p className="mt-2 text-center font-bold flex justify-center">
              <a
                href={"/login"}
                className="text-center text-blue-700 font-bold"
              >
                Entrar na sua conta
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
