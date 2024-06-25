import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const access = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 flex flex-col justify-center items-center">
          <h2>Cadastro efetuado com sucesso!</h2>
          <p>Em breve você poderá acessar o painel do aluno.</p>
          <button
            className="bg-gray-400 w-28 h-10 rounded text-white font-bold text-xl"
            type="button"
            onClick={access}
          >
            Concluir
          </button>
        </div>
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_NODE_URL}/image/accesspainel.png`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Success;
