import React, { useState } from "react";

import api from "../../services/api";
import apiNode from "../../services/apiNode";

import messages from "../../services/messsages";
import { PContent } from "../../components";

const DeployComponent = () => {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeployWeb = async () => {
    if (!window.confirm("Você realmente deseja executar o deploy web?")) {
      return;
    }
    setLoading(true);
    setOutput('');
    api.post("/deploy").then((response) => {
      setOutput(response.data.output);
      messages.mensagem.sucesso(response.data.message);
      setLoading(false);
      console.log(response);
    }).catch((error) => {
      const errorMsg = error.response ? error.response.data.message : error.message;
      setOutput(error.response ? error.response.data.output : errorMsg);
      messages.mensagem.erro("Erro ao executar o deploy: " + errorMsg);
      console.log(error);
      setLoading(false);
    });
  };

  const handleDeployApi = async () => {
    if (!window.confirm("Você realmente deseja executar o deploy API?")) {
      return;
    }
    setLoading(true);
    setOutput('');

    apiNode.get('performance/up-api')
      .then((response) => {
        if (response.data.status === 'success') {
          messages.mensagem.sucesso("Deploy concluído com sucesso!");
          setOutput(response.data.mensagem);
        } else {
          messages.mensagem.erro("Erro ao executar o deploy");
          setOutput(response.data.mensagem);
        }
        setLoading(false);
      }).catch((erro) => {
        messages.mensagem.erro("Erro ao executar o deploy");
        console.log(erro);
        setOutput(erro.message);
        setLoading(false);
      });
  };

  return (
    <PContent>
      <span className="text-3xl font-semibold text-gray-800 mb-2">Executar Deploy</span>
      <div className="flex gap-2 m-2">
        <button
          className={
            "bg-green-600 px-6 py-4 rounded text-gray-200 font-semibold text-sm"
          }
          onClick={handleDeployWeb}
          disabled={loading}
        >
          Executar Deploy Web
        </button>

        <button
          className={
            "bg-sky-500 px-6 py-4 rounded text-gray-200 font-semibold text-sm"
          }
          onClick={handleDeployApi}
          disabled={loading}
        >
          Executar Deploy API
        </button>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-semibold text-gray-800">Resposta da Chamada:</span>
        {loading && <div className="my-4">
          <div className="border-collapse border border-slate-400 rounded my-4 px-3">
            <h3 className="py-3">
              Aguarde, esse processo pode demorar alguns segundos.
            </h3>
          </div>
        </div>}
        {output !== '' && <div className="border-collapse border border-slate-400 rounded mt-4 px-3">
          <pre>{output}</pre>
        </div>}
      </div>
    </PContent>
  );
};

export default DeployComponent;
