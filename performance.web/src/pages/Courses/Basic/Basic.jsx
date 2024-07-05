import React, { useState } from "react";
import { Link } from "react-router-dom";

function Basic() {
  const Publico = () => {
    return (
      <>
        <p className="font-semibold">
          Essa certificação é dirigida aos membros da Diretoria Executiva do
          RPPS que é o órgão de execução dos atos de gestão da unidade gestora
          do RPPS.
        </p>
      </>
    );
  };
  const Estrutura = () => {
    return (
      <>
        <ul className="list-disc list-inside text-justify font-semibold">
          <li>
            Aulas no formato descritivo com interação com a plataforma, através
            de recursos dinâmicos e visuais;
          </li>
          <li>Videoaulas;</li>
          <li>Exercícios de fixação;</li>
          <li>Simulados;</li>
        </ul>
      </>
    );
  };
  const Conteudo = () => {
    return (
      <div>
        <ol className="list-decimal list-inside grid grid-cols-2 text-justify font-semibold">
          <div className="mx-5">
            <li>Seguridade Social</li>
            <li>Regimes Próprios de Previdência Social - RPPS</li>
            <li>Planos de Benefícios</li>
            <li>Plano de Custeio</li>
            <li>Gestão Atuarial</li>
            <li>Gestão dos insvestimentos dos Recursos Previdenciários</li>
            <li>Gestão Contábil</li>
            <li>Responsbilidade Fiscal e Previdenciária</li>
            <li>Compensação Previdenciária</li>
          </div>
          <div className="mx-5">
            <li>Controle Interno e Externo</li>
            <li>Regulação e Fiscalização</li>
            <li>Certificação Institucional</li>
            <li>Compliance e Ética</li>
            <li>Administração Pública</li>
            <li>Inelegibilidade</li>
            <li>Responsabilidade Disciplinar, Civil e Criminal</li>
            <li>Critérios do CRP</li>
            <li>Noções Básicas de Economia</li>
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
      label: "ESTRUTURA DO CURSO",
      content: <Estrutura />,
    },

    {
      label: "CONTEÚDO",
      content: <Conteudo />,
    },
  ];

  return (
    <div className="container text-center py-10">
      <div className="row py-10">
        <div className="col-md-7 order-md-2">
          <h2 className="fw-normal mb-3">
            Curso Preparatório para Certificação dos Dirigentes da Unidade
            Gestora do RPPS – Nível Básico
          </h2>
          <p className="lead">
            Oferecemos um curso preparatório para a prova aplicada atualmente
            pelo Instituto Totum, ABIPEM E APIMEC, a ser realizado no período de
            quatro dias totalizando 30 horas/aula contemplando todo conteúdo
            programático da ementa exigida pela SPREV.
          </p>
          <h3>Valor do investimento</h3>
          <h3>R$597,00</h3>
          <Link to="https://pay.kiwify.com.br/EdpJxk7">
            <button
              type="submit"
              className="w-5/12 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              COMPRAR
            </button>
          </Link>
        </div>
        <div className="flex col-md-5 order-md-1">
          <img
            className="img-fluid"
            src={`${process.env.REACT_APP_NODE_URL}/image/curso2.jpg`}
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
    </div>
  );
}

export default Basic;
