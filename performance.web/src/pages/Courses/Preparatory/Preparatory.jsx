import React from "react";
import { useState } from "react";

import Subscribe from "../../../components/Forms/Subscribe/Subscribe";

const initial = process.env.NODE_ENV === "production" ? "/performance" : "";

function Preparatory() {
  const Publico = () => {
    return (
      <>
        <p className="font-semibold">
          Dirigentes, conselho fiscal, conselho deliberativo, comitê de
          investimentos e gestor de recursos do RPPS.
        </p>
      </>
    );
  };

  const Conteudo = () => {
    return (
      <div className="flex flex-col">
        <ol className="list-decimal list-inside text-justify font-semibold">
          <div>
            <li>Seguridade Social</li>
            <li>Regimes Próprios de Previdência Social - RPPS</li>
            <li>Beneficiários: segurados e dependentes. </li>
            <li>Plano de Custeio: Contribuições previdenciárias.</li>
            <li>Recursos Previdenciários</li>
            <li>Plano de Benefícios e Reajustamento dos benefícios.</li>
            <li>
              Digitalização – Procedimento para separar documentação, scanear e
              enviar processos ao COMPREV WEB
            </li>
            <li>CTC.</li>

            <li>Compensação Previdenciária</li>
            <li>Abono de permanência.</li>
            <li>Registro no Tribunal de Contas.</li>
            <li>Contabilidade aplicada ao RPPS</li>
            <li>Emenda Constitucional 103/2019. Portaria MTPS 1.467/2022.</li>
            <li>Acumulação de benefícios e artigo 24 da EC 103/2019.</li>
            <li>Previdência complementar no serviço público.</li>
            <li>
              Critérios exigidos para emissão do CRP e as suas consequências.
            </li>
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

    /* {
      label: "CONTEÚDO",
      content: <Conteudo />,
    }, */
  ];

  return (
    <div className="container text-center py-10">
      <div className="row py-10 items-center">
        <div className="col-md-7 order-md-2">
          <h2 className="mb-3 text-sky-600 font-semibold">
            CURSO PREPARATÓRIO
          </h2>
          <h2 className="featurette-heading fw-normal lh-1">
            Para a Certificação Profissional de Dirigentes, Conselheiros e
            Comitê de investimentos dos RPPS (Nível Básico e Intermediário).
          </h2>
          <p className="mt-3 tracking-wide font-normal text-xl text-justify">
            Curso Preparatório para a Certificação Profissional RPPS, nível
            básico e Intermediário Conforme Portaria MTP 1.467, de 02 junho de
            2022, presencial em Goiânia-GO
          </p>
          <p className="text-sky-600 font-bold text-3xl">
            Dias 10 à 13 de junho de 2024
          </p>
          <h3 className="text-sky-600 font-bold text-3xl">
            Local: Vila Cultural Cora Coralina - Goiânia-GO
          </h3>
          <h3 className="text-sky-800 font-bold text-3xl mt-5">
            Preencha o formulário abaixo que entraremos em contato para mais
            detalhes do curso.
          </h3>
          <p className="text-sky-600 font-bold text-3xl">Valor:</p>
          <p className="text-sky-600 text-3xl">
            R$ 890,00
          </p>
        </div>
        <div className="flex col-md-5 order-md-1">
          <img
            className="img-fluid"
            src={initial + "/image/_curso.jpg"}
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

export default Preparatory;
