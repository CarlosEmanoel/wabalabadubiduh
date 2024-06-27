import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../services/api";
import { Content } from "../../../components/views/Content/Content";
import messages from "../../../services/messages";
import { PContent } from "../../../components";

function ShowSubscribe() {
  const { id } = useParams();

  const [subscribe, setSubscribe] = useState({});
  const [courseName, setCourseName] = useState("");
  const [nivelName, setNivelName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get("/inscricao/" + id).then((response) => {
        let data = {
          id: response.data.data.id,
          nome: response.data.data.nome,
          email: response.data.data.email,
          telefone: response.data.data.telefone,
          cnpj: response.data.data.cnpj,
          cpf: response.data.data.cpf,
          unidadegestora: response.data.data.unidadegestora,
          cargo: response.data.data.cargo,
          endereco: response.data.data.endereco,
          bairro: response.data.data.bairro,
          municipio: response.data.data.municipio,
          estado: response.data.data.estado,
          cep: response.data.data.cep,
          nivelId: response.data.data.nivel_id,
          cursoId: response.data.data.curso_id,
        };
        setSubscribe(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (subscribe.cursoId && subscribe.nivelId) {
      api.get(`/curso/${subscribe.cursoId}`).then((response) => {
        setCourseName(response.data.data.titulo);
        const nivelSubscribe = response.data.data.niveis.find(
          (nivel) => nivel.id === subscribe.nivelId
        );
        switch (nivelSubscribe.nivel) {
          case 0:
            setNivelName("Não possui nível");
            break;
          case 1:
            setNivelName("Básico");
            break;
          case 2:
            setNivelName("Intermediário");
            break;
          case 3:
            setNivelName("Avançado");
            break;
          default:
            break;
        }
      });
    }
  }, [subscribe.cursoId]);

  const formik = useFormik({
    onSubmit: async (data) => {
      if (!id) {
        api.post("/inscricao", data).then((response) => {
          setSubscribe([]);

          formik.values = {
            nome: "",
            email: "",
            telefone: "",
            cnpj: "",
            cpf: "",
            unidadegestora: "",
            cargo: "",
            endereco: "",
            bairro: "",
            municipio: "",
            estado: "",
            cep: "",
          };
          messages.mensagem.sucesso("Inscrição efetuada com sucesso!");
        });
      } else {
        data.id = id;
        api.patch("/inscricao", data).then((response) => {
          setSubscribe([]);
          formik.values = {
            nome: "",
            email: "",
            telefone: "",
            cnpj: "",
            cpf: "",
            unidadegestora: "",
            cargo: "",
            endereco: "",
            bairro: "",
            municipio: "",
            estado: "",
            cep: "",
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
      cnpj: "",
      cpf: "",
      unidadegestora: "",
      cargo: "",
      endereco: "",
      bairro: "",
      municipio: "",
      estado: "",
      cep: "",
    },
  });

  const voltar = () => {
    navigate("/painel/listainscricoes");
  };

  return (
    <PContent>
      <div className="my-4">
        <div className="border-collapse border border-slate-400 rounded px-3">
          <h3 className="py-3 border-b border-neutral-400 ">
            Inscrição Recebida
          </h3>

          <form className="flex flex-col">
            <div className="grid grid-cols-3">
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="nome">
                  Nome:
                </label>
                <div className="font-normal" htmlFor="nome">
                  {subscribe.nome}
                </div>
              </div>

              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="email">
                  E-mail:
                </label>
                <div className="font-normal" htmlFor="email">
                  {subscribe.email}
                </div>
              </div>

              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="telefone">
                  Telefone:
                </label>
                <div className="font-normal" htmlFor="telefone">
                  {subscribe.telefone}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3">
              {subscribe.cnpj && (
                <>
                  <div className="mt-4 px-4">
                    <label className="font-semibold mr-2" htmlFor="cnpj">
                      CNPJ:
                    </label>
                    <div className="font-normal" htmlFor="cnpj">
                      {subscribe.cnpj}
                    </div>
                  </div>

                  <div className="mt-4 px-4">
                    <label
                      className="font-semibold mr-2"
                      htmlFor="unidade gestora"
                    >
                      Unidade Gestora:
                    </label>
                    <div
                      className="font-normal break-words text-justify"
                      htmlFor="unidade gestora"
                    >
                      {subscribe.unidadegestora}
                    </div>
                  </div>
                </>
              )}
              {subscribe.cpf && (
                <div className="mt-4 px-4">
                  <label
                    className="font-semibold mr-2"
                    htmlFor="unidade gestora"
                  >
                    CPF:
                  </label>
                  <div
                    className="font-normal break-words text-justify"
                    htmlFor="unidade gestora"
                  >
                    {subscribe.cpf}
                  </div>
                </div>
              )}
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="cargo">
                  Cargo:
                </label>
                <div className="font-normal" htmlFor="cargo">
                  {subscribe.cargo}
                </div>
              </div>
            </div>
            {subscribe.cpf && (
              <>
                <div className="grid grid-cols-3">
                  <div className="mt-4 px-4">
                    <label className="font-semibold mr-2" htmlFor="endereço">
                      Endereço:
                    </label>
                    <div className="font-normal" htmlFor="endereço">
                      {subscribe.endereco}
                    </div>
                  </div>
                  <div className="mt-4 px-4">
                    <label className="font-semibold mr-2" htmlFor="bairro">
                      Bairro:
                    </label>
                    <div className="font-normal" htmlFor="bairro">
                      {subscribe.bairro}
                    </div>
                  </div>
                  <div className="mt-4 px-4">
                    <label className="font-semibold mr-2" htmlFor="município">
                      Município:
                    </label>
                    <div className="font-normal" htmlFor="município">
                      {subscribe.municipio}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="mt-4 px-4">
                    <label className="font-semibold mr-2" htmlFor="estado">
                      Estado:
                    </label>
                    <div className="font-normal" htmlFor="estado">
                      {subscribe.estado}
                    </div>
                  </div>
                  <div className="mt-4 px-4">
                    <label className="font-semibold mr-2" htmlFor="cep">
                      CEP:
                    </label>
                    <div className="font-normal" htmlFor="cep">
                      {subscribe.cep}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-3">
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="courseName">
                  Curso:
                </label>
                <div className="font-normal" id="courseName">
                  {courseName}
                </div>
              </div>
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="nivelName">
                  Nível:
                </label>
                <div className="font-normal" id="nivelName">
                  {nivelName}
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
export default ShowSubscribe;
