import "./Practice.css";
import { useEffect, useState } from "react";

import api from "../../services/api";

function Practice() {
  const [lista, setLista] = useState([]);
  const [corrigir, setCorrigir] = useState(true);

  function carregarLista() {
    api.get("/questoes").then((response) => {
      console.log(response.data);
      setLista(response.data);
    });
  }

  useEffect(() => {
    {
      carregarLista();
    }
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-4">Página de simulado</h2>

      {lista.length === 0 && <div>Não exitem questões!</div>}

      <div className="quiz">
        <ul className="list-group">
          {lista.map((questao) => (
            <li>
              <div>
                {questao.alternativas.length === 0 && (
                  <div>Não existem alternativas!</div>
                )}

                <div dangerouslySetInnerHTML={{ __html: questao.pergunta }} />

                {questao.alternativas.map((alternativa) => (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={"alternativa[" + questao.id + "]"}
                      id="flexRadio"
                    />
                    <label htmlFor="flexRadio">
                      {alternativa.letra} - {alternativa.resposta}
                    </label>
                  </div>
                ))}
              </div>

              {corrigir === true && (
                <div className="alert alert-success">
                  <span>
                    <strong>Resposta do Gabarito -</strong>{" "}
                  </span>
                  {questao.respostacorreta} - {questao.respostacomentada}
                </div>
              )}

              <div className="alert alert-danger">Você errou! Resposta: X</div>

              <div className="alert alert-success">Parabéns! Você acertou!</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <button
          className="mb-2 bg-sky-600 w-48 p-2 text-gray-200 font-bold text-lg rounded"
          type="button"
        >
          Corrigir
        </button>
      </div>
    </div>
  );
}

export default Practice;
