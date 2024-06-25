import React, { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from "react-data-table-component";
import { BsTrash, BsCardChecklist } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import util from "../../services/util";
import messages from "../../services/messsages";

import { confirmAlert } from "react-confirm-alert";

import NewButton from "../../components/NewButton/NewButton";
import { PContent } from "../../components";

const ListaInscricao = () => {
  const [listainscricao, setListaInscricao] = useState([]);

  const navigate = useNavigate();

  function ver(id) {
    navigate(util.getEnv() + "/painel/inscricao/" + id);
  }

  const columns = [
    {
      name: "NOME",
      selector: (row) => row.nome,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "TELEFONE",
      selector: (row) => row.telefone,
    },
    {
      name: "UNID. GESTORA",
      selector: (row) => row.unidadegestora,
    },
    {
      name: "INSCRIÇÃO",
      selector: (row) => row.mensagem,
      cell: (row) => (
        <>
          <button className="btn" onClick={() => ver(row.id)}>
            <BsCardChecklist color="blue" />
          </button>
        </>
      ),
    },
    {
      name: "AÇÕES",
      button: true,
      right: true,
      cell: (row) => (
        <>
          <button className="btn" onClick={() => confirmaExclusao(row.id)}>
            <BsTrash color="red" />
          </button>
        </>
      ),
    },
  ];

  const carregarInscricao = () => {
    api
      .get("/inscricoes")
      .then((response) => {
        if (response.data && response.data.success === true) {
          setListaInscricao(response.data.data);
        } else {
          messages.mensagem.erro("Nenhuma inscrição encontrado.");
        }
      })
      .catch((erro) => {
        messages.mensagem.erro("");
      });
  };
  useEffect(() => {
    {
      carregarInscricao();
    }
  }, []);

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
          onClick: () => {},
        },
      ],
    });
  };

  const excluir = (id) => {
    api
      .delete("/inscricao/" + id)
      .then((response) => {
        if (response.data.success === true) {
          messages.mensagem.sucesso(response.data.message);
          carregarInscricao();
        } else {
          messages.mensagem.erro(response.data.message);
        }
      })
      .catch((erro) => {
        messages.mensagem.sucesso("Erro : " + erro);
      });
  };

  return (
    <PContent>
      <NewButton path={"/painel/newinscricao"} />
      <DataTable
        className="border-collapse border border-slate-400"
        title="LISTA DE INSCRIÇÃO"
        columns={columns}
        data={listainscricao}
        pagination
        highlightOnHover
      />
    </PContent>
  );
};

export default ListaInscricao;
