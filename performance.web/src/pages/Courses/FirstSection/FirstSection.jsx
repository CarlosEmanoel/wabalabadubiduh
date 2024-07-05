import React from "react";
import { PFileFetcher, PSectionContainer } from "../../../components";

export default function FirstSection() {
  return (
    <PSectionContainer className="bg-primary_blue">
      <div className="flex gap-10 justify-center flex-col lg:flex-row text-white">
        <PFileFetcher
          fileName={"stock_seminar_speaking_girl"}
          alt={`Slide ${"stock_seminar_speaking_girl"}`}
          className="md:max-w-md transition-all duration-300 rounded-lg filter grayscale"
        />
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left">
            CONHEÇA NOSSOS CURSOS
          </h2>
          <p className="text-gray-400 mb-4 text-center lg:text-left">
            Uma ampla gama de ensinamentos voltados à área previdenciária e
            administrativa.
          </p>
          <p className="mb-6 text-justify">
            A Performance oferece uma variedade de cursos e programas
            especializados para capacitar profissionais na administração eficaz
            e sustentável dos Regimes Próprios de Previdência Social (RPPS) e
            Administração Pública. Com a orientação de especialistas de renome,
            nossos cursos proporcionam aprendizado prático e aplicável,
            garantindo a excelência na gestão previdenciária e administrativa.
          </p>
          <p>
            <strong>Performance Goiânia</strong>
            <br />
            Transformando a sua previdência!
            <br />
          </p>
        </div>
      </div>
    </PSectionContainer>
  );
}
