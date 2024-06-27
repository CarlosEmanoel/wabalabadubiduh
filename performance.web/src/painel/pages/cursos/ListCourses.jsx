import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { BsPencil, BsTrash } from "react-icons/bs";
import NewButton from "../../../components/NewButton/NewButton";
import api from "../../../services/api";
import messages from "../../../services/messages";
import util from "../../../services/util";
import { PContent, PDataTable } from "../../../components";

const ListCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const loadCourses = () => {
    api
      .get(`/cursos`)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setCourses(response.data.data);
        } else {
          console.error("A resposta não é um array:", response.data);
        }
      })
      .catch((erro) => {
        console.error("Erro ao buscar cursos!", erro);
      });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const columns = [
    {
      name: "TÍTULO",
      dataIndex: "titulo",
      type: "text",
      sortable: true,
      filterable: true,
    },
    {
      name: "DATA DE INÍCIO",
      dataIndex: "data_inicio",
      type: "date",
      sortable: true,
      filterable: true,
    },
    {
      name: "DATA DE FIM",
      dataIndex: "data_fim",
      type: "date",
      sortable: true,
      filterable: true,
    },
    {
      name: "STATUS",
      dataIndex: "is_active",
      type: "text",
      sortable: "true",
      filterable: "true",
      value: (row) => (row.is_active ? "Ativo" : "Inativo"),
    },
    {
      name: "AÇÕES",
      dataIndex: "actions",
      type: "text",
      sortable: false,
      filterable: false,
      cell: (row) => (
        <div className="flex justify-center items-center">
          <div className="cursor-pointer border-solid border-2 border-sky-200/[.55] hover:bg-sky-200 rounded-md w-11 h-9 mr-1.5 flex justify-center items-center">
            <button
              className="btn"
              onClick={() =>
                navigate(util.getEnv() + `/painel/cursoform/${row.id}`)
              }
            >
              <BsPencil color="blue" />
            </button>
          </div>
          <div className="cursor-pointer border-solid border-2 border-red-200/[.55] hover:bg-red-200 rounded-md w-11 h-9 flex justify-center items-center">
            <button className="btn" onClick={() => confirmExclusion(row.id)}>
              <BsTrash color="red" />
            </button>
          </div>
        </div>
      ),
    },
  ];

  const confirmExclusion = (id) => {
    confirmAlert({
      title: "Confirmação",
      message: "Tem certeza que deseja excluir?",
      buttons: [
        {
          label: "Sim",
          onClick: () => exclude(id),
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
  };

  const exclude = (id) => {
    api
      .delete(`/curso/${id}`)
      .then((response) => {
        if (response.data.success === true) {
          messages.mensagem.sucesso(response.data.message);
          loadCourses();
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
      <NewButton path={"/painel/cursoform"} />
      <PDataTable
        title="Lista de Cursos"
        columns={columns}
        data={courses}
        rowKey="id"
      />
    </PContent>
  );
};

export default ListCourses;
