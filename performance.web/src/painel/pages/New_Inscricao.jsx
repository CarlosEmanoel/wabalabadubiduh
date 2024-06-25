import React from "react";
import { useNavigate } from "react-router-dom";
import util2 from "../../services/util";
import { PContent } from "../../components";

const New_Inscricao = () => {
  const navigate = useNavigate();

  const voltar = () => {
    navigate(util2.getEnv() + "/painel/listainscricoes");
  };
  return (
    <PContent>
      <div className="container">
        <form className="space-y-8">
          <div>
            <h1 className="text-sky-500 font-semibold flex justify-center">
              Nova inscrição!
            </h1>
          </div>
          <div className=" input-box w-9/12 mx-auto mt-4 mb-5 rounded-md bg-gray-200 p-8 border border-gray-600">
            <div className="grid grid-cols-2 gap-3">
              <div className="my-3">
                <label htmlFor="">Nome completo</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Curso</label>
                <input
                  type="text"
                  id="curso"
                  name="curso"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite o curso"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="my-3">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite seu email"
                />
              </div>
              <div className="my-3">
                <label>Telefone</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite um telefone"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">
                  CNPJ ou CPF para emissão da Nota Fiscal
                </label>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite um CNPJ ou CPF"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="my-3">
                <label htmlFor="">Unidade Gestora</label>
                <input
                  type="text"
                  id="unidadegestora"
                  name="unidadegestora"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite sua unidade gestora"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Cargo</label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite o cargo"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="my-3">
                <label htmlFor="">Endereço</label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite o seu endereço"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Bairro</label>
                <input
                  type="text"
                  id="bairro"
                  name="bairro"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite o seu bairro"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="my-3">
                <label htmlFor="">Município</label>
                <input
                  type="text"
                  id="municipio"
                  name="municipio"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite seu município"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Estado</label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite seu Estado"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">CEP</label>
                <input
                  type="cep"
                  id="cep"
                  name="cep"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Digite seu CEP"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-24 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mr-3 rounded focus:outline-none focus:shadow-outline"
              >
                ENVIAR
              </button>
              <button
                className="bg-gray-500 w-24 mt-4 rounded text-gray-100 font-semibold"
                type="button"
                onClick={voltar}
              >
                VOLTAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </PContent>
  );
};

export default New_Inscricao;
