import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import util from "../../services/util";
import messages from "../../services/messsages";
import { PContent } from "../../components";

const UserNovoSimulado = () => {
  const usuarioId = util.storage.getItem("uid");

  const [valorSelecionado, setValorSelecionado] = useState("");

  if (!usuarioId) {
    messages.mensagem.erro("Não tem usuário");
  }

  const initialFormState = {
    id: 0,
    total: "",
    pontuacao: "",
    usuarioId: usuarioId,
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    alert(valorSelecionado);
  };

  const navigate = useNavigate();

  const voltar = () => {
    navigate("/user/userlistasimulado");
  };

  return (
    <PContent>
      <div className="w-3/5 my-3 px-2 border-collapse border border-slate-400">
        <h2 className="text-xl font-semibold text-gray-700 py-2 text-center border-solid border-b-2 border-gray-200 ">
          {" "}
          NOVO SIMULADO
        </h2>
        <form onSubmit={handleSalvar}>
          <select
            className="form-select"
            aria-label="Default select example"
            name="questoes"
            value={valorSelecionado.nome}
            onChange={(e) => setValorSelecionado(e.target.value)}
          >
            <option selected>TODOS</option>
            <option value="1">10 QUESTÕES</option>
            <option value="2">20 QUESTÕES</option>
            <option value="3">30 QUESTÕES</option>
          </select>

          <button
            className="bg-green-600 w-24 mt-5 mb-3 py-2 mr-5 rounded text-gray-100 font-semibold text-lg"
            type="submit"
            onClick={handleSalvar}
          >
            SALVAR
          </button>
          <button
            className="bg-gray-500 w-24 mt-5 mb-3 py-2 rounded text-gray-200 font-semibold text-lg"
            type="button"
            onClick={voltar}
          >
            Voltar
          </button>
        </form>
      </div>
    </PContent>
  );
};

export default UserNovoSimulado;
