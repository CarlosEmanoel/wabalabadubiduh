import React from "react";
import { PSectionContainer } from "../../components";

export default function FirstSection() {
  return (
    <PSectionContainer className="min-h-[70vh] bg-primary_blue bg-cover bg-center">
      <div className="justify-center text-white">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left">
            Entre em Contato Conosco
          </h2>
          <p className="mb-6 text-justify">
            Estamos aqui para ajudá-lo! Se você tiver alguma dúvida, sugestão ou
            precisar de suporte, não hesite em nos contatar. Nossa equipe está
            pronta para atendê-lo e garantir que você tenha a melhor experiência
            possível. Utilize o formulário abaixo para enviar sua mensagem, e
            retornaremos o mais breve possível.
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
