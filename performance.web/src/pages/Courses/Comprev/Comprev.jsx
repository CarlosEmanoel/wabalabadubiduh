import React from "react";
import { useState } from "react";

import Subscribe from "../../../components/Forms/Subscribe/Subscribe";

const initial = process.env.NODE_ENV === "production" ? "/performance" : "";

function Comprev() {
  const Publico = () => {
    return (
      <>
        <p className="font-semibold">Operadores do sistema COMPREV.</p>
      </>
    );
  };

  const Conteudo = () => {
    return (
      <div className="flex flex-col">
        <ol className="list-decimal list-inside text-justify font-semibold">
          <div>
            <li>Respostas de exigências</li>
            <li>Análises de requerimentos do RGPS</li>
            <li>Análises de requerimentos de outros RPPS</li>
            <li>Controle de pagamentos</li>
            <li>Mentoria específica a realidade do RPPS participante</li>
          </div>
        </ol>
      </div>
    );
  };
  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
    {
      label: "PÚBLICO-ALVO",
      content: <Publico />,
    },

    {
      label: "CONTEÚDO",
      content: <Conteudo />,
    },
  ];

  return (
    <div className="container text-center py-10">
      <div className="row py-10 items-center">
        <div className="col-md-6 order-md-2">
          <h2 className="mb-3 text-sky-600 font-semibold">
            COMPREV NA PRÁTICA
          </h2>
          <p className="mt-3 tracking-wide font-normal text-xl text-justify">
            Capacitação para realizar compensação previdenciária entre os
            regimes previdenciários, com a finalidade de repassar valores
            financeiros, das Certidões de Tempo de Contribuições emitidas ou
            averbadas pela Unidade Gestora.
          </p>
          <p className="text-sky-600 font-bold text-3xl">
            Dias 13 e 14 de maio de 2024
          </p>
          <div style={{ paddingTop: 25, paddingBottom: 25 }}>
            <h3 className="text-sky-600 font font-semibold">
              TREINAMENTO PRESENCIAL EM GOIÂNIA - GO
            </h3>
          </div>
        </div>

        <div className="col-md-6 order-md-1">
          <img
            className="img-fluid"
            src={initial + "/image/comprev.jpg"}
            alt=""
          />
        </div>
      </div>

      <hr className="featurette-divider" />

      <div className="tab mt-5">
        <ul className="container flex justify-center">
          {tabData.map((tab, index) => (
            <li
              key={index}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer p-2 rounded-xl mr-4 font-semibold ${
                index === activeTab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
        <div className="tab-body inline-block p-4">
          {tabData[activeTab].content}
        </div>
      </div>

      <hr className="featurette-divider" />

      <div>
        <Subscribe />
      </div>
    </div>
  );
}

export default Comprev;
