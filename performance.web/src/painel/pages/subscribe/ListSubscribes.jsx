import React, { useEffect, useState } from "react";
import { BsTrash, BsCardChecklist } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import util from "../../../services/util";
import { PContent, PDataTable } from "../../../components";
import { confirmAlert } from "react-confirm-alert";
import messages from "../../../services/messages";

const ListSubscribes = () => {
  const navigate = useNavigate();
  const [subscribes, setSubscribes] = useState([]);

  const loadSubscribes = () => {
    api
      .get(`/inscricoes`)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setSubscribes(response.data.data);
        } else {
          console.error("A resposta não é um array:", response.data);
        }
      })
      .catch((erro) => {
        console.error("Erro ao buscar inscrições!", erro);
      });
  };

  useEffect(() => {
    loadSubscribes();
  }, []);

  const columns = [
    {
      name: "NOME",
      dataIndex: "nome",
      type: "text",
      sortable: true,
      filterable: true,
    },
    {
      name: "E-MAIL",
      dataIndex: "email",
      type: "text",
      sortable: true,
      filterable: true,
    },
    {
      name: "TELEFONE",
      dataIndex: "telefone",
      type: "text",
      sortable: true,
      filterable: true,
    },
    {
      name: "AÇÕES",
      dataIndex: "actions",
      type: "text",
      sortable: false,
      filterable: false,
      cell: (row) => (
        <div className="flex">
          <button
            className="border-solid border-2 border-green-200/[.55] hover:bg-green-200 rounded-md w-11 h-9 mr-1.5 flex justify-center items-center"
            onClick={() =>
              navigate(util.getEnv() + `/painel/inscricao/${row.id}`)
            }
          >
            <BsCardChecklist color="green" />
          </button>
          <button className="border-solid border-2 border-red-200/[.55] hover:bg-red-200 rounded-md w-11 h-9 flex justify-center items-center" onClick={() => confirmExclusion(row.id)}>
            <BsTrash color="red" />
          </button>
        </div>
      ),
    },
  ];

  const confirmExclusion = (id) => {
    confirmAlert({
      title: "Confirmação",
      message: "Tem certeza que deseja excluir?",
      overlayClassName: "bg-gray-800 bg-opacity-75",
      buttons: [
        {
          label: "Sim",
          onClick: () => exclude(id),
        },
        {
          label: "Não",
          onClick: () => { },
        },
      ],
    });
  };

  const exclude = (id) => {
    api
      .delete(`/inscricao/${id}`)
      .then((response) => {
        if (response.data.success === true) {
          messages.mensagem.sucesso(response.data.message);
          loadSubscribes();
        } else {
          messages.mensagem.erro(response.data.message);
        }
      })
      .catch((erro) => {
        messages.mensagem.erro("Erro : " + erro);
      });
  };

  return (
    <PContent>
      <PDataTable
        title="Lista de Inscrições"
        columns={columns}
        data={subscribes}
        rowKey="id"
      />
    </PContent>
  );
};

export default ListSubscribes;
