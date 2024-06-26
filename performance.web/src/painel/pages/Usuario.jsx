import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import "react-confirm-alert/src/react-confirm-alert.css";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

import util from "../../services/util";
import { PContent } from "../../components";

const Usuario = () => {
  const initial = {
    id: "",
    nome: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    tipo: "",
    cpf: "",
    telefone: "",
    permissao: false,
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(initial);
  const [acessoSimulado, setAcessoSimulado] = useState(0);
  const [nivelSimulado, setNivelSimulado] = useState(0);

  useEffect(() => {
    api
      .get(`/usuario/${id}`)
      .then((response) => {
        if (response.data && response.data.success) {
          setUsuario(response.data.data);
        } else {
          console.error("Falha ao buscar dados do usuário.");
        }
      })
      .catch((erro) => {
        console.error("Erro ao buscar usuário!", erro);
      });

    api
      .get(`/acessosimulado/${id}`)
      .then((response) => {
        if (response.data && response.data.success) {
          setAcessoSimulado(response.data.data[0].tipo);
          setNivelSimulado(response.data.data[0].nivelsimulado);
        } else {
          console.error("Falha ao buscar acessos - simulado.");
        }
      })
      .catch((erro) => {
        console.error("Erro ao buscar acessos - simulado!", erro);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "permissao") {
      setUsuario((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (name === "permissaoAcesso") {
      setAcessoSimulado(value);
    } else if (name === "nivelSimulado") {
      setNivelSimulado(value);
    } else {
      setUsuario((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        nome: usuario.nome,
        email: usuario.email,
        username: usuario.username,
        tipo: usuario.tipo,
        cpf: usuario.cpf,
        telefone: usuario.telefone,
        permissao: usuario.permissao,
      };
      const userResponse = await api.patch(`/usuario/${id}`, userData);

      if (userResponse.data.success) {
        console.log("Dados do usuário atualizados com sucesso");
      } else {
        console.error("Erro ao atualizar dados do usuário");
        return;
      }
      // Atualizar permissaoAcesso
      const tipoAcesso = {
        tipo: acessoSimulado,
        nivelsimulado: nivelSimulado,
      };
      const acessoResponse = await api.patch(
        `/acessosimulado/${id}`,
        tipoAcesso
      );

      if (acessoResponse.data.success) {
        console.log("Permissão de acesso atualizada com sucesso");
      } else {
        console.error("Erro ao atualizar permissão de acesso");
      }
    } catch (erro) {
      console.error("Erro ao salvar informações", erro);
    }
    navigate(0);
  };

  const voltar = () => {
    navigate(util.getEnv() + "/painel/listausuario");
  };

  return (
    <PContent>
      <div className="container">
        <div className="w-3/5 my-3 px-2 border-collapse border border-slate-400 ">
          <h2 className="text-xl font-semibold text-gray-700 py-2 text-center border-solid border-b-2 border-gray-200 ">
            {" "}
            Cadastro de usuário - Editar
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nome"
                className="ext-sm font-bold text-gray-600 block"
              >
                Nome
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={usuario.nome || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="ext-sm font-bold text-gray-600 block"
              >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={usuario.email || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="ext-sm font-bold text-gray-600 block"
              >
                Nome de usuário
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={usuario.username || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="ext-sm font-bold text-gray-600 block"
              >
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                id="cpf"
                value={usuario.cpf || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="ext-sm font-bold text-gray-600 block"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={usuario.telefone || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="permissaoAcesso"
                className="ext-sm font-bold text-gray-600 block"
              >
                Tipo do Simulado
              </label>
              <select
                name="permissaoAcesso"
                id="permissaoAcesso"
                value={acessoSimulado}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option disabled value={0}>
                  Não definido
                </option>
                <option value={1}>Dirigentes e Conselheiros</option>
                <option value={2}>Investimentos</option>
                <option value={3}>Ambos</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="nivelSimulado"
                className="ext-sm font-bold text-gray-600 block"
              >
                Nível do Simulado
              </label>
              <select
                name="nivelSimulado"
                id="nivelSimulado"
                value={nivelSimulado}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option disabled value={0}>
                  Não definido
                </option>
                <option value={1}>Básico</option>
                <option value={2}>Intermediário</option>
                <option value={3}>Avançado</option>
              </select>
            </div>
            <div className="flex justify-center my-4">
              <button
                className="bg-green-600 w-24 mr-4 py-2 rounded text-gray-100 font-semibold"
                type="submit"
              >
                SALVAR
              </button>

              <button
                className="bg-gray-500 w-24 py-2 rounded text-gray-100 font-semibold"
                type="button"
                onClick={voltar}
              >
                VOLTAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </PContent>
  );
};

export default Usuario;
