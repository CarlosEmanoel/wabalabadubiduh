import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import messages from "../../services/messsages";
import { PContent } from "../../components";

function PainelContato_msg() {
  const { id } = useParams();

  const [listaContato, setListaContato] = useState({});

  const navigate = useNavigate();

  const carregar = () => {
    if (id) {
      api.get("/contato/" + id).then((response) => {
        let data = {
          id: response.data.data.id,
          nome: response.data.data.nome,
          email: response.data.data.email,
          telefone: response.data.data.telefone,
          assunto: response.data.data.assunto,
          mensagem: response.data.data.mensagem,
        };

        setListaContato(data);
      });
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const formik = useFormik({
    onSubmit: async (data) => {
      if (!id) {
        api.post("/contato", data).then((response) => {
          setListaContato([]);

          formik.values = {
            nome: "",
            email: "",
            telefone: "",
            assunto: "",
            mensagem: "",
          };
          messages.mensagem.sucesso("Cadastrado com sucesso!");
        });
      } else {
        data.id = id;
        api.patch("/contato", data).then((response) => {
          setListaContato([]);

          formik.values = {
            nome: "",
            email: "",
            telefone: "",
            assunto: "",
            mensagem: "",
          };

          if (response.data.success === true) {
            messages.mensagem.sucesso(response.data.message);
          } else {
            messages.mensagem.erro(response.data.message);
          }
        });
      }
    },
    initialValues: {
      nome: "",
      email: "",
      telefone: "",
      assunto: "",
      mensagem: "",
    },
  });

  const voltar = () => {
    navigate("/painel/contatos");
  };

  return (
    <PContent>
      <div className="my-4">
        <div className="border-collapse border border-slate-400 rounded px-3">
          <h3 className="py-3 border-b border-neutral-400 ">
            Mensagens recebidas
          </h3>

          <form className="flex flex-col">
            <div>
              <div className="mt-4">
                <label className="font-medium mr-2" htmlFor="nome">
                  Nome:
                </label>
                <div className="font-normal" htmlFor="nome">
                  {listaContato.nome}
                </div>
              </div>

              <div className="mt-4">
                <label className="font-medium mr-2" htmlFor="email">
                  E-mail:
                </label>
                <div className="font-normal" htmlFor="email">
                  {listaContato.email}
                </div>
              </div>

              <div className="mt-4">
                <label className="font-medium mr-2" htmlFor="telefone">
                  Telefone:
                </label>
                <div className="font-normal" htmlFor="telefone">
                  {listaContato.telefone}
                </div>
              </div>

              <div className="mt-4">
                <label className="font-medium mr-2" htmlFor="assunto">
                  Assunto:
                </label>
                <div className="font-normal" htmlFor="assunto">
                  {listaContato.assunto}
                </div>
              </div>

              <div className="mt-4">
                <label className="font-medium mr-2" htmlFor="mensagem">
                  Mensagem:
                </label>
                <div
                  className="font-normal break-words text-justify"
                  htmlFor="mensagem"
                >
                  {listaContato.mensagem}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 mb-5 space-x-4">
              <button
                className="bg-gray-500 w-32 h-12 rounded text-gray-100 font-semibold text-lg"
                type="button"
                onClick={voltar}
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </div>
    </PContent>
  );
}
export default PainelContato_msg;
