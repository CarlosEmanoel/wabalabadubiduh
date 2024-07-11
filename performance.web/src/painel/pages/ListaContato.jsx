import React, { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from "react-data-table-component";
import { BsFillEnvelopeAtFill, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import util from "../../services/util";
import messages from "../../services/messages";

import { confirmAlert } from "react-confirm-alert";
import { PContent } from "../../components";

const ListaContato = () => {
  const [listacontato, setListaContato] = useState([]);

  const navigate = useNavigate();

  function ver(id) {
    navigate(util.getEnv() + "/painel/contato/" + id);
  }

  const columns = [
    {
      name: "NOME",
      selector: (row) => row.nome,
    },
    {
      name: "E-MAIL",
      selector: (row) => row.email,
    },
    {
      name: "TELEFONE",
      selector: (row) => row.telefone,
    },
    {
      name: "MENSAGEM",
      selector: (row) => row.mensagem,
      cell: (row) => (
        <>
          <button className="btn" onClick={() => ver(row.id)}>
            <BsFillEnvelopeAtFill color="blue" />
          </button>
        </>
      ),
    },
    {
      name: "STATUS",
      cell: (row) => (
        <div className="flex flex-wrap">
          <button className="bg-green-200 text-green-600 font-bold py-2 px-3 mr-3 rounded-md">
            lida
          </button>
          <button className="bg-red-200 text-red-600 font-bold py-2 px-3 rounded-md">
            não lida
          </button>
        </div>
      ),
    },
    {
      name: "AÇÕES",
      button: true,
      width: "20%",
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

  const carregarContato = () => {
    api
      .get("/contatos")
      .then((response) => {
        if (response.data && response.data.success === true) {
          setListaContato(response.data.data);
        } else {
          messages.mensagem.erro("Nenhum contato encontrado.");
        }
      })
      .catch((erro) => {
        messages.mensagem.erro("");
      });
  };
  useEffect(() => {
    {
      carregarContato();
    }
  }, []);

  const confirmaExclusao = (id) => {
    confirmAlert({
      title: "Confirmação",
      message: "Tem certeza que deseja excluir?",
      overlayClassName: "bg-gray-800 bg-opacity-75",

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
      .delete("/contato/" + id)
      .then((response) => {
        if (response.data.success === true) {
          messages.mensagem.sucesso(response.data.message);
          carregarContato();
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
      <DataTable
        className="border-collapse border border-slate-400"
        title="LISTA DE CONTATOS"
        columns={columns}
        data={listacontato}
        pagination
        highlightOnHover
      />
    </PContent>
  );
};

export default ListaContato;
