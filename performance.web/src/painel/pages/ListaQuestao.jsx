import React, { useEffect, useState } from "react";
import api from "../../services/api";
import util from "../../services/util";
import messages from "../../services/messsages";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import NewButton from "../../components/NewButton/NewButton";
import { PContent, PDataTable } from "../../components";

function ListaQuestao() {
  const [listaQuestoes, setListaQuestoes] = useState([]);
  const navigate = useNavigate();

  function editar(id) {
    navigate(
      util.getEnv() +
      "/painel/painelquestionario/" +
      id
    );
  }

  const carregarLista = () => {
    api
      .get('/questoes')
      .then((response) => {
        if (response.data.success === true) {
          const questoes = response.data.data.map(questao => ({
            ...questao,
            nivelTexto: nivelTexto(questao.nivel),
            tipoTexto: tipoTexto(questao.tipo)
          }));
          setListaQuestoes(questoes);
        } else {
          messages.mensagem.erro("Ocorreu um erro ao buscar os registros de questões.");
        }
      })
  };

  useEffect(() => {
    carregarLista();
  }, []);

  const columns = [
    {
      name: "PERGUNTAS",
      dataIndex: "pergunta",
      width: "60%",
      type: "text",
      sortable: true,
      filterable: true,
    },
    {
      name: "Nível",
      dataIndex: "nivelTexto",
      width: "15%",
      type: "text",
      sortable: true,
      filterable: true,
    },
    {
      name: "Tipo",
      dataIndex: "tipoTexto",
      width: "15%",
      type: "text",
      sortable: true,
      filterable: true,
    },
    {
      name: "AÇÕES",
      dataIndex: "actions",
      width: "10%",
      type: "text",
      button: true,
      right: true,
      cell: (row) => (
        <div className="flex justify-center items-center">
          <button className="btn border-solid border-2 border-sky-200/[.55] hover:bg-sky-200 rounded-md w-11 h-9 mr-1.5 flex items-center justify-center" onClick={() => editar(row.id)}>
            <BsPencil color="blue" />
          </button>
          <button className="btn border-solid border-2 border-red-200/[.55] hover:bg-red-200 rounded-md w-11 h-9 flex items-center justify-center" onClick={() => confirmaExclusao(row.id)}>
            <BsTrash color="red" />
          </button>
        </div>
      ),
    },
  ];

  const confirmaExclusao = (id) => {
    confirmAlert({
      title: "Confirmação",
      message: "Tem certeza que deseja excluir?",
      buttons: [
        {
          label: "Sim",
          onClick: () => excluir(id),
        },
        {
          label: "Não",
          onClick: () => { },
        },
      ],
    });
  };

  const excluir = (id) => {
    api
      .delete("/questao/" + id)
      .then((response) => {
        if (response.data.success === true) {
          messages.mensagem.sucesso(response.data.message);
          carregarLista();
        } else {
          messages.mensagem.erro(response.data.message);
        }
      })
      .catch((erro) => {
        messages.mensagem.sucesso("Erro : " + erro);
      });
  };

  const nivelTexto = (nivel) => {
    const niveis = {
      0: "Sem Nível Definido",
      1: "Básico",
      2: "Intermediário",
      3: "Avançado",
    };

    return niveis[nivel] || "Nível Desconhecido";
  };

  const tipoTexto = (tipo) => {
    const tipos = {
      0: "Sem Tipo Definido",
      1: "Dirigentes e Conselheiros",
      2: "Finanças",
    };

    return tipos[tipo] || "Tipo Desconhecido";
  };

  return (
    <PContent>
      <NewButton path={"/painel/painelquestionario"} />
      <PDataTable
        title="Listagem e Cadastro de Questões"
        columns={columns}
        data={listaQuestoes}
        rowKey="id"
      />
    </PContent>
  );
}

export default ListaQuestao;
