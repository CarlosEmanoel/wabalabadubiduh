import React from "react";
import { useNavigate } from "react-router-dom";
import util2 from "../../services/util";
import { PContent } from "../../components";

const NewCursos = () => {
  const navigate = useNavigate();

  const voltar = () => {
    navigate(util2.getEnv() + "/painel/listacursos");
  };
  return (
    <PContent>
      <div className="container">
        <div className="w-3/5 my-3 px-2 border-collapse border border-slate-400">
          <h2 className="text-xl font-semibold text-gray-700 py-2 text-center border-solid border-b-2 border-gray-200 ">
            Cadastro de Cursos
          </h2>
          <div className="mt-4 mb-5 rounded-md bg-white ">
            <form className="space-y-8">
              <div>
                <label
                  htmlFor="titulo"
                  className="text-base font-bold text-gray-600 block"
                >
                  Nome do Curso
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Digite o curso"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-base font-bold text-gray-600 block"
                >
                  Descrição
                </label>
                <input
                  type="text"
                  id="descricao"
                  name="descricao"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Digite a descrição"
                />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  className="bg-green-600 w-24 mr-4 py-2 rounded text-gray-100 font-semibold"
                  type="submit"
                >
                  SALVAR
                </button>

                <button
                  className="bg-gray-500 w-24 rounded text-gray-100 font-semibold"
                  type="button"
                  onClick={voltar}
                >
                  VOLTAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PContent>
  );
};

export default NewCursos;
