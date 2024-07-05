import React from "react";
import { PFileFetcher, PSectionContainer } from "../../../components";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <PSectionContainer>
      <div className="flex mt-24 p-10 bg-white rounded-lg shadow-lg gap-10 flex-col md:flex-row">
        <div className="content-center">
          <div className="text-center">
            <span className="text-lg md:text-xl lg:text-2xl font-bold ">
              Cadastro Efetuado com Sucesso!
            </span>
            <p className="mt-6">
              Obrigado por se cadastrar. Em breve, você poderá acessar o painel
              do aluno.
            </p>
          </div>
          <div className="flex justify-center w-full mt-6">
            <button
              className="bg-gray-400 w-28 h-10 rounded text-white font-bold text-xl"
              type="button"
              onClick={() => navigate("/")}
            >
              Voltar
            </button>
          </div>
        </div>
        <PFileFetcher
          className="w-full md:w-96"
          fileName="accesspainel"
          alt="Cadastro Efetuado"
        />
      </div>
    </PSectionContainer>
  );
};

export default Success;
