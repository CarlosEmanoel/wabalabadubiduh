import React from "react";
import { PFileFetcher, PSectionContainer } from "../../components";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <PSectionContainer>
      <div className="flex mt-24 p-10 bg-white rounded-lg shadow-lg gap-10 flex-col md:flex-row">
        <div className="content-center">
          <div className="text-center">
            <span className="text-lg md:text-xl lg:text-2xl font-bold ">
              Acesso Negado!
            </span>
            <p className="mt-6">
              Desculpe, você não tem permissão para acessar esta área.
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
          fileName="blockpainel"
          alt="Acesso Negado"
        />
      </div>
    </PSectionContainer>
  );
};

export default Unauthorized;
