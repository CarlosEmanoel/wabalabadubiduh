import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import InputMask from "react-input-mask";
import util from "../../services/util";
import messages from "../../services/messages";
import { PContent } from "../../components";

const validationSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  username: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve conter, pelo menos, 6 caracteres")
    .max(8, "A senha deve conter, no máximo, 8 caracteres")
    .required("Campo obrigatório"),
  telefone: yup
    .string()
    .min(14, "Telefone inválido")
    .required("Campo obrigatório"),
});

const PainelUsuario = () => {
  const navigate = useNavigate();

  let API_ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

  if (process.env.NODE_ENV === "production") {
    API_ENDPOINT = "https://expansaodigital.tec.br/performance.api";
  }

  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios({
        method: "post",
        baseURL: API_ENDPOINT,
        url: "/usuario",
        data: values,
      });
      if (res.data.success === true) {
        messages.mensagem.sucesso("Usuário cadastrado com sucesso");
        navigate(util.getEnv() + "/painel/listausuario");
      } else {
        messages.mensagem.erro(res.data.message);
        console.log(res.data.message);
        /* setErro(res.data.message); */
      }
    },
    initialValues: {
      nome: "",
      cpf: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      telefone: "",
      tipo: "painel",
    },
    validationSchema,
  });
  const voltar = () => {
    navigate(util.getEnv() + "/painel/listausuario");
  };

  return (
    <PContent>
      <div className="container">
        <div className="w-3/5 my-3 px-2 border-collapse border border-slate-400 ">
          <h2 className="text-xl font-semibold text-gray-700 py-2 text-center border-solid border-b-2 border-gray-200 ">
            {" "}
            Cadastro de usuário - Novo
          </h2>

          <div className="mt-4 mb-5 rounded-md bg-white ">
            <form className="space-y-8" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="nome"
                  className="text-sm font-bold text-gray-600 block"
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Digite nome completo"
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
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-gray-600 block"
                >
                  E-mail
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Digite um e-mail"
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
              <div>
                <label
                  htmlFor="cpf"
                  className="text-sm font-bold text-gray-600 block"
                >
                  CPF
                </label>
                <InputMask
                  type="text"
                  id="cpf"
                  name="cpf"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Digite cpf"
                  error={formik.errors.cpf}
                  value={formik.values.cpf}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  mask="999.999.999-99"
                />
                {formik.errors.cpf && (
                  <span className="p-2 text-sm text-red-500">
                    {formik.errors.cpf}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-bold text-gray-600 block"
                >
                  Usuário
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border border-gray-300 rounded"
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

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-gray-600 block"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Crie uma senha"
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

              <div>
                <label
                  htmlFor="telefone"
                  className="text-sm font-bold text-gray-600 block"
                >
                  Telefone
                </label>
                <InputMask
                  mask={"(99) 99999-9999"}
                  maskChar={null}
                  alwaysShowMask={false}
                  type="text"
                  id="telefone"
                  name="telefone"
                  className="w-full p-2 border border-gray-300 rounded"
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

              <div className="flex justify-center">
                <button
                  className="bg-green-600 w-24 mr-4 py-2 rounded text-gray-100 font-semibold"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Carregando..." : "SALVAR"}
                </button>

                <button
                  className="bg-gray-500 w-24 rounded text-gray-100 font-semibold"
                  type="button"
                  onClick={voltar}
                >
                  VOLTAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PContent>
  );
};

export default PainelUsuario;
