import React, { useState } from "react";
import Subscribe from "../../../components/Forms/Subscribe/Subscribe";
import PDFLink from "../../../components/PDFLink/PDFLink";

const initial = process.env.NODE_ENV === "production" ? "/performance" : "";

function InPerson() {
  const Publico = () => {
    return (
      <>
        <p className="font-semibold">
          Gestores, conselheiros, assessoria jurídica e técnicos que participam da gestão dos
          RPPS.
        </p>
      </>
    );
  };

  /* const Ementa = () => {
    return (
      <div>
        <p className="font-semibold">
          Clique no ícone e conheça a EMENTA DO CURSO.
        </p>
        <PDFLink path={"/image/ementa.pdf"} />
      </div>
    );
  }; */

  const Estrutura = () => {
    return (
      <div>
        <p className="font-semibold">
          1. Introdução à Ciência Atuarial
          <br />
          a. Definição da Ciência Atuarial
          <br />
          b. Relação com a Matemática Financeira e a Estatística
          <br />
          c. Aplicações da Atuária na vida moderna e nos RPPS
          <br />
          d. Trajetória previdenciária
          <br />
          e. Tábuas biométricas
          <br />
          f. Probabilidades de mortalidade e sobrevivência
          <br />
          g. Outras probabilidades (invalidez, morbidez, etc.)
          <br />
          h. Esperança de vida
          <br />
          i. Tábuas de serviço
          <br />
          j. Comutações
          <br />
          k. Anuidades
        </p>
        <p className="font-semibold">
          2. Plano de benefícios
          <br />
          a. Definição
          <br />
          b. Aspectos legais a serem observados na avaliação atuarial
          <br />
          c. Tipos de planos (BD, CD e CV)
        </p>
        <p className="font-semibold">
          3. Plano de custeio
          <br />
          a. Definição
          <br />
          b. Regimes financeiros
          <br />
          c. Métodos atuariais de cálculo de custos
          <br />
          d. Custos normais e suplementares
          <br />
          e. Custeio ordinário e extraordinário
        </p>
        <p className="font-semibold">
          4. Conceitos aplicáveis à avaliação atuarial
          <br />
          a. Hipóteses de trabalho
          <br />
          b. Documentos utilizados
          <br />
          c. Benefícios avaliados
          <br />
          d. Base cadastral
          <br />
          e. Plano de custeio
          <br />
          f. Parecer atuarial
          <br />
          g. Análise dos ganhos e perdas
          <br />
          h. Duração do passivo
          <br />
          i. DRAA
        </p>

        <p className="font-semibold">
          5. Interpretação do relatório de avaliação atuarial
          <br />
          a. Tópicos abordados no relatório de avaliação atuarial
          <br />
          b. Apresentação de um modelo de relatório atuarial
          <br />
          c. Informações gerais da avaliação atuarial
          <br />
          d. Plano de custeio
          <br />
          e. Legislação aplicável
          <br />
          f. Plano de benefícios
          <br />
          g. Hipóteses atuariais
          <br />
          h. Regimes financeiros e método atuarial
          <br />
          i. Custos dos benefícios
          <br />
          j. Estimativa de comprev
          <br />
          k. Base cadastral
          <br />
          l. Situação atuarial
          <br />
          m. Aspectos legais da revisão de plano de custeio
          <br />
          n. Aspectos legais do equacionamento de déficits atuariais
          <br />
          o. Recomendações sobre o plano de custeio de equilíbrio
          <br />
          p. Projeções atuariais
        </p>

        <p className="font-semibold">
          6. Outros documentos atuariais
          <br />
          a. Demonstrativo dos Resultados da Avaliação Atuarial (DRAA)
          <br />
          b. Fluxos atuariais
          <br />
          c. Demonstrativo de Viabilidade do Plano de Custeio
          <br />
          d. Nota Técnica Atuarial
          <br />
          e. Relatório de Gestão Atuarial
          <br />
          f. Plano de Trabalho Atuarial
        </p>

        <p className="font-semibold">Carga horária: 16 horas</p>
      </div>
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

    /* {
      label: "EMENTA DO CURSO",
      content: <Ementa />,
    }, */

    {
      label: "ESTRUTURA DO CURSO",
      content: <Estrutura />,
    },
  ];
  /* {
        label: "CONTEÚDO",
        content: <Conteudo />,
      }, */
  return (
    <div className="container text-center py-10">
      <div className="row py-10 items-center">
        <div className="col-md-6 order-md-2">
          <h2 className="mb-3 text-sky-600 font-semibold">
            COMO ANALISAR UMA AVALIAÇÃO ATUARIAL
          </h2>
          <p className="mt-3 tracking-wide font-normal text-xl text-justify">
            Apresentar os conceitos básicos relacionados com a avaliação atuarial de RPPS e
            interpretação do relatório de avaliação atuarial.
          </p>
          <p className="text-sky-600 font-bold text-3xl">
            Dias 07 e 08 de agosto de 2024
          </p>
          <h2 className="text-sky-600 font font-semibold">GOIÂNIA - GO</h2>
          <div style={{ paddingTop: 25, paddingBottom: 25 }}>
            <p className="text-sky-600 font-bold text-3xl">Valor: 720,00</p>
          </div>
        </div>

        <div className="col-md-6 order-md-1">
          <img
            className="img-fluid"
            src={initial + "/image/atuarial.jpg"}
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
              className={`cursor-pointer p-2 rounded-xl mr-4 font-semibold ${index === activeTab
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

export default InPerson;
