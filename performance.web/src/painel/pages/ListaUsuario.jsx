import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from "react-data-table-component";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
  BsPencil,
  BsTrash,
} from "react-icons/bs";
import api from "../../services/api";
import messages from "../../services/messsages";

import NewButton from "../../components/NewButton/NewButton";
import { useNavigate } from "react-router-dom";
import util from "../../services/util";
import { PContent, PDataTable } from "../../components";

function ListaUsuario() {
  const [listausuario, setListaUsuario] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      name: "NOME",
      dataIndex: "nome",
      type: "text",
      width: "50%",
      sortable: true,
      filterable: true,
    },
    {
      name: "E-MAIL",
      dataIndex: "email",
      width: "40%",
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
          {row.tipo === "user" && (
            <button
              className="btn border-solid border-2 border-red-200/[.55] hover:bg-red-200 rounded-md w-11 h-9 mr-1.5 flex justify-center items-center"
              onClick={() => confirmaPermissao(row)}
            >
              {row.permissao === true ? (
                <BsFillHandThumbsUpFill color="#589d62" />
              ) : (
                <BsFillHandThumbsDownFill color="red" />
              )}
            </button>
          )}
          <button
            className="btn border-solid border-2 border-sky-200/[.55] hover:bg-sky-200 rounded-md w-11 h-9 mr-1.5 flex justify-center items-center"
            onClick={() =>
              navigate(`${util.getEnv()}/painel/editar-usuario/${row.id}`)
            }
          >
            <BsPencil color="blue" />
          </button>
          <button
            className="btn border-solid border-2 border-red-200/[.55] hover:bg-red-200 rounded-md w-11 h-9 flex justify-center items-center"
            onClick={() => confirmaExclusao(row.id)}
          >
            <BsTrash color="red" />
          </button>
        </div>
      ),
    },
  ];

  const carregarUsuario = () => {
    api
      .get("/usuarios")
      .then((response) => {
        if (response.data && response.data.success === true) {
          setListaUsuario(response.data.data);
        } else {
          messages.mensagem.erro("Nenhum usuário encontrado.");
        }
      })
      .catch((erro) => {
        messages.mensagem.erro("Nenhum usuário encontrado!");
      });
  };
  useEffect(() => {
    carregarUsuario();
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

  const confirmaPermissao = (row) => {
    confirmAlert({
      title: "Confirmação",

      message: row.permissao
        ? "Tem certeza que deseja retirar o acesso desse usuário?"
        : "Tem certeza que deseja permitir o acesso desse usuário?",

      buttons: [
        {
          label: "Sim",
          onClick: () => permitirUsuario(row),
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
      .delete("/usuario/" + id)
      .then((response) => {
        if (response.data.success === true) {
          messages.mensagem.sucesso(response.data.message);
          carregarUsuario();
        } else {
          messages.mensagem.erro(response.data.message);
        }
      })
      .catch((erro) => {
        messages.mensagem.sucesso("Erro : " + erro);
      });
  };

  const permitirUsuario = (row) => {
    let data = row;
    data.permissao = !data.permissao;
    api
      .patch(`/usuario/${row.id}`, data)
      .then((response) => {
        if (response.data.success === true) {
          messages.mensagem.sucesso(response.data.message);
          carregarUsuario();
        } else {
          messages.mensagem.erro(response.data.message);
        }
      })
      .catch((erro) => {
        messages.mensagem.erro("Erro : " + erro);
      });
  };

  return (
    <>
      <PContent>
        <NewButton path={"/painel/painelusuario"} />
        <PDataTable
          title="Lista de Usuários"
          columns={columns}
          data={listausuario}
          rowKey="id"
        />
      </PContent>
    </>
  );
}

export default ListaUsuario;
