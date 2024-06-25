import { useEffect, useState } from "react";

import api from "../../services/api";

import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { GoAlertFill } from "react-icons/go";
import util from "../../services/util";
import { PContent } from "../../components";

function SimuladoDiretor() {
  const [lista, setLista] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [questoesPorPagina] = useState(10);
  const [questoesExibidas, setQuestoesExibidas] = useState([]);
  // Cálculo das questões exibidas com base na página atual
  const [indexOfLastQuestion, setIndexOfLastQuestion] = useState(10);
  const [indexOfFirstQuestion, setIndexOfFirstQuestion] = useState(0);

  const [acessoSimulado, setAcessoSimulado] = useState(0);
  const id = util.storage.getItem("uid");

  const nivelSimulado = async () => {
    try {
      const response = await api.get(`/acessosimulado/${id}`);
      if (
        response.data &&
        response.data.success &&
        response.data.data.length > 0
      ) {
        console.log(response.data);
        console.log("resposta: ", response.data.data);
        setAcessoSimulado(response.data.data[0].nivelsimulado);
      } else {
        console.error("Falha ao buscar acessos - simulado.");
      }
    } catch (erro) {
      console.error("Erro ao buscar acessos - simulado!", erro);
    }
  };

  useEffect(() => {
    nivelSimulado();
  }, [id]);

  useEffect(() => {
    if (acessoSimulado > 0) {
      carregarLista();
    }
  }, [acessoSimulado]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const carregarLista = async () => {
    let niveisPermitidos = [];
    if (acessoSimulado > 0) {
      for (let i = 1; i <= acessoSimulado; i++) {
        niveisPermitidos.push(i);
      }
    }

    let dadosCombinados = [];

    // Função auxiliar para buscar questões por nível
    const buscarQuestoesPorNivel = async (nivel) => {
      let url = `/questoes?tipo=1?nivel=${nivel}`;
      return api.get(url).then((response) => response.data.data);
    };

    // Faz requisições para cada nível permitido e combina os resultados
    for (let nivel of niveisPermitidos) {
      let dadosPorNivel = await buscarQuestoesPorNivel(nivel);
      dadosCombinados = [...dadosCombinados, ...dadosPorNivel];
    }

    shuffleArray(dadosCombinados);

    dadosCombinados.forEach((item, index) => {
      let sorteado = item.alternativas.sort(compareByLetra);
      item.respostaSelecionada = "";
      item.corrigir = false;
      item.alternativas = sorteado;
      item.numero = index + 1;
    });

    setLista(dadosCombinados.length > 0 ? dadosCombinados : []);
    setQuestoesExibidas(
      dadosCombinados.slice(indexOfFirstQuestion, indexOfLastQuestion)
    );
  };

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
        <h2 className="text-center text-gray-700 text-3xl mt-4 mb-7 border-collapse border-4 py-3 bg-sky-300 rounded">
          Simulado - Dirigentes e Conselheiros
        </h2>
        <div>
          <ul className="list-group list-group-numbered px-5">
            {questoesExibidas.map((questao, index) => (
              <li className="p-4" key={questao.id}>
                <div className="font-bold text-gray-700 uppercase">
                  Questão {questao.numero}
                </div>
                <div dangerouslySetInnerHTML={{ __html: questao.pergunta }} />
                <div className="mb-5">
                  {questao.alternativas.map((alternativa) => (
                    <div className="form-check px-5 mt-3">
                      <input
                        className="form-check-input mr-3"
                        type="radio"
                        name={"alternativa[" + questao.id + "]"}
                        value={alternativa.letra}
                        onChange={() =>
                          handleRespostaSelecionada(alternativa.letra, questao)
                        }
                      />
                      <label>
                        <strong>{alternativa.letra}</strong> -{" "}
                        {alternativa.resposta}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="alert alert-primary w-96">
                  <div className="font-bold text-gray-700 uppercase">
                    ALTERNATIVA SELECIONADA - {questao.respostaSelecionada}
                  </div>
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
          {paginaAtual < totalPages && (
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

export default SimuladoDiretor;
