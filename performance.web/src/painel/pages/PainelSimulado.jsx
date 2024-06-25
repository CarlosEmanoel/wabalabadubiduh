import { useEffect, useState } from "react";

import api from "../../services/api";

import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { GoAlertFill } from "react-icons/go";
import { PContent } from "../../components";

function Simulado() {
  const [lista, setLista] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [questoesPorPagina] = useState(10);
  const [questoesExibidas, setQuestoesExibidas] = useState([]);
  // Cálculo das questões exibidas com base na página atual
  const [indexOfLastQuestion, setIndexOfLastQuestion] = useState(10);
  const [indexOfFirstQuestion, setIndexOfFirstQuestion] = useState(0);
  const [todasRespondidas, setTodasRespondidas] = useState(false);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const carregarLista = () => {
    api.get("/questoes").then((response) => {
      let dados = response.data.data;

      shuffleArray(dados);

      dados.forEach((item, index) => {
        let sorteado = [];
        sorteado = item.alternativas.sort(compareByLetra);
        item.respostaSelecionada = "";
        item.corrigir = false;
        item.alternativas = sorteado;
        item.numero = index + 1;
      });

      setLista(dados);
      setQuestoesExibidas(
        dados.slice(indexOfFirstQuestion, indexOfLastQuestion)
      );
    });
  };

  useEffect(() => {
    carregarLista();
  }, []);

  const compareByLetra = (a, b) => {
    const letraA = a.letra.toUpperCase();
    const letraB = b.letra.toUpperCase();

    if (letraA < letraB) {
      return -1;
    }
    if (letraA > letraB) {
      return 1;
    }
    return 0;
  };

  const handleRespostaSelecionada = (letraResposta, questao) => {
    questao.respostaSelecionada = letraResposta;
  };

  const corrigirQuestao = () => {
    const listaAuxiliar = questoesExibidas.map((item) => ({
      ...item,
      corrigir: true,
    }));

    setQuestoesExibidas(listaAuxiliar);
  };

  const nextPage = () => {
    const totalPages = Math.ceil(lista.length / questoesPorPagina);
    if (paginaAtual < totalPages) {
      let nova = paginaAtual + 1;
      setPaginaAtual(nova);
      let last = nova * questoesPorPagina;
      setIndexOfLastQuestion(last);
      let first = last - questoesPorPagina;
      setIndexOfFirstQuestion(questoesPorPagina - last);
      setQuestoesExibidas(lista.slice(first, last));
    }
  };

  // Função para voltar para a página anterior
  const prevPage = () => {
    if (paginaAtual > 0) {
      let nova = paginaAtual - 1;
      setPaginaAtual(nova);
      let last = nova * questoesPorPagina;
      setIndexOfLastQuestion(last);
      let first = last - questoesPorPagina;
      setIndexOfFirstQuestion(questoesPorPagina - last);
      setQuestoesExibidas(lista.slice(first, last));
    }
  };

  const totalPages = Math.ceil(lista.length / questoesPorPagina);

  return (
    <PContent>
      <div>
        <h2 className="text-center text-gray-700 mt-4 mb-7 border-collapse border-4 py-3 bg-sky-300 rounded">
          Página de simulado
        </h2>
        <div>
          <ul className="list-group list-group-numbered px-5">
            {questoesExibidas.map((questao, index) => (
              <li key={questao.id}>
                <div className="font-bold text-gray-700 uppercase">
                  Questão {questao.numero}
                </div>
                <div dangerouslySetInnerHTML={{ __html: questao.pergunta }} />
                <div className="mb-5">
                  {questao.alternativas.map((alternativa) => (
                    <div className="form-check px-5 mt-3">
                      <label>
                        <strong>{alternativa.letra}</strong> -{" "}
                        {alternativa.resposta}
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={"alternativa[" + questao.id + "]"}
                        value={alternativa.letra}
                        onChange={() =>
                          handleRespostaSelecionada(alternativa.letra, questao)
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="alert alert-primary w-96">
                  <strong>
                    ALTERNATIVA SELECIONADA - {questao.respostaSelecionada}
                  </strong>{" "}
                </div>
                <div>{questao.respostaCorreta}</div>

                {questao.corrigir &&
                  (questao.respostaSelecionada === "" ? (
                    <div className="alert alert-warning w-96">
                      <div className="flex items-center">
                        <GoAlertFill className="mr-2" />
                        <strong>MARQUE UMA DAS ALTERNATIVAS</strong>
                      </div>
                    </div>
                  ) : questao.respostaSelecionada ===
                    questao.respostacorreta ? (
                    <div className="alert alert-success items-center ">
                      <div className="flex items-center">
                        <FaCheckCircle className="mr-2" />
                        <strong>Parabéns!</strong> Você acertou!
                      </div>
                      <span>
                        <strong> Resposta do Gabarito -</strong>
                      </span>
                      <strong>{questao.respostacorreta}</strong> -{" "}
                      {questao.respostacomentada}
                    </div>
                  ) : (
                    <div className="alert alert-danger" role="alert">
                      <div className="flex items-center">
                        <AiFillCloseCircle className="mr-2" />
                        <strong>Você errou!</strong>
                      </div>
                      <span>
                        <strong> Resposta do Gabarito -</strong>
                      </span>
                      <strong>{questao.respostacorreta}</strong> -{" "}
                      {questao.respostacomentada}
                    </div>
                  ))}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            className="mb-2 bg-sky-500 hover:bg-sky-700 w-48 p-2 text-gray-200 font-semibold text-lg rounded"
            type="button"
            onClick={corrigirQuestao}
          >
            Corrigir
          </button>
        </div>

        <div className="flex justify-center mt-4">
        {paginaAtual > 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={prevPage}
            >
              Anterior
            </button>
          )}
          {paginaAtual < totalPages &&  (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={nextPage}
            >
              Próxima
            </button>
          )}
        </div>
      </div>
    </PContent>
  );
}

export default Simulado;
