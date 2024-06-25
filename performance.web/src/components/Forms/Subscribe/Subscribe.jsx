import React, { useState } from "react";
import api from "../../../services/api";
import util from "../../../services/util";
import { PDefaultContainer, PSectionContainer } from "../..";
import { useSendMail } from "../../../hooks";

const Subscribe = () => {
  const [sucesso, setSucesso] = useState("");
  const [erro, setErro] = useState("");

  const insc_initial = {
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
    cursoId: "clozscdyn0000txd43mk2xsrq",
  };

  const insc_validate = () => {
    if (inscricao.nome === "") return false;

    if (inscricao.email === "") return false;

    if (inscricao.telefone === "") return false;

    if (inscricao.unidadegestora === "") return false;

    if (inscricao.cargo === "") return false;

    if (inscricao.endereco === "") return false;

    if (inscricao.bairro === "") return false;

    if (inscricao.municipio === "") return false;

    if (inscricao.estado === "") return false;

    if (inscricao.cep === "") return false;

    return true;
  };

  const valorInscricao = (e) => {
    let { name, value } = e.target;

    if (name === "telefone") {
      let nValue = util.mask("telefone", value);
      setInscricao({ ...inscricao, [name]: nValue });
    } else if (name === "cnpj") {
      let nValue = util.mask("cnpj", value);
      setInscricao({ ...inscricao, [name]: nValue });
    } else if (name === "cep") {
      let nValue = util.mask("cep", value);
      setInscricao({ ...inscricao, [name]: nValue });
    } else {
      setInscricao({ ...inscricao, [e.target.name]: e.target.value });
    }
  };

  const [inscricao, setInscricao] = useState(insc_initial);

  const { sendEmail, success } = useSendMail();
  const emailData = {
    subject: 'Confirmação de Inscrição',
    body: `
        Olá ${inscricao.nome},
        
        Parabéns! Sua inscrição foi realizada com sucesso. Seguem abaixo os detalhes da sua inscrição:

        Nome: ${inscricao.nome}
        E-mail: ${inscricao.email}
        Telefone: ${inscricao.telefone}
        CNPJ: ${inscricao.cnpj}
        Unidade Gestora: ${inscricao.unidadegestora}
        Cargo: ${inscricao.cargo}
        Endereço: ${inscricao.endereco}
        Bairro: ${inscricao.bairro}
        Município: ${inscricao.municipio}
        Estado: ${inscricao.estado}
        CEP: ${inscricao.cep}

        Estamos entusiasmados por tê-lo(a) em nosso curso e esperamos que esta experiência seja enriquecedora e gratificante.

        Em breve, enviaremos mais informações sobre o curso e outras orientações importantes. Caso tenha alguma dúvida, não hesite em nos contatar através deste e-mail.

        Agradecemos a sua inscrição!

        Atenciosamente,
        Equipe Performance Goiânia
    `,
    from: 'inscricao@performance.goiania.br',
    to: inscricao.email
  };
  async function sendResponse() {
    await sendEmail(emailData);
    console.log(success)
  }

  const sendInscricao = (e) => {
    e.preventDefault();

    if (insc_validate()) {
      api
        .post("/inscricao", inscricao)
        .then((response) => {
          if (response.data.success === true) {
            setErro("");
            setSucesso(response.data.message);
            sendResponse()
            setInscricao(insc_initial);
          } else {
            setSucesso("");
            setErro(response.data.message);
          }
        })
        .catch((error) => {
          setSucesso("");
          if (error.data) setErro(error.data.message);
          else setErro("Ocorreu um erro! Tente novamente mais tarde.");
        });
    } else {
      setSucesso("");
      setErro("Por favor, preencha todos os campos!");
    }
  };

  return (
    <PDefaultContainer>
      <form className="space-y-8" onSubmit={sendInscricao}>
        <div className=" input-box w-9/12 mx-auto mt-4 mb-5 rounded-md bg-gray-200 p-8 border border-gray-600">
          <div className="my-3">
            <label htmlFor="">Nome completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Digite seu nome completo"
              value={inscricao.nome}
              onChange={valorInscricao}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="my-3">
              <label htmlFor="">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite seu email"
                value={inscricao.email}
                onChange={valorInscricao}
              />
            </div>
            <div className="my-3">
              <label>Telefone</label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite um telefone"
                value={inscricao.telefone}
                onChange={valorInscricao}
                maxLength={14}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">CNPJ para emissão da Nota Fiscal</label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite um CNPJ"
                value={inscricao.cnpj}
                onChange={valorInscricao}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="my-3">
              <label htmlFor="">Unidade Gestora</label>
              <input
                type="text"
                id="unidadegestora"
                name="unidadegestora"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite sua unidade gestora"
                value={inscricao.unidadegestora}
                onChange={valorInscricao}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Cargo</label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite o cargo"
                value={inscricao.cargo}
                onChange={valorInscricao}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="my-3">
              <label htmlFor="">Endereço</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite o seu endereço"
                value={inscricao.endereco}
                onChange={valorInscricao}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Bairro</label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite o seu bairro"
                value={inscricao.bairro}
                onChange={valorInscricao}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="my-3">
              <label htmlFor="">Município</label>
              <input
                type="text"
                id="municipio"
                name="municipio"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite seu município"
                value={inscricao.municipio}
                onChange={valorInscricao}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Estado</label>
              <input
                type="text"
                id="estado"
                name="estado"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite seu Estado"
                value={inscricao.estado}
                onChange={valorInscricao}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">CEP</label>
              <input
                type="cep"
                id="cep"
                name="cep"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Digite seu CEP"
                value={inscricao.cep}
                onChange={valorInscricao}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-9/12 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enviar
            </button>
          </div>
          <div className="mt-3">
            {erro !== "" && (
              <div className="text-red-500 w-80 p-3 mx-auto border-solid border-2 border-red-500 bg-red-100 rounded">
                {erro}
              </div>
            )}{" "}
            <br />
            {sucesso !== "" && (
              <div className="text-green-800 mx-auto w-80 h-15 p-3 border-solid border-2 border-green-500 bg-green-100 rounded">
                {sucesso}
              </div>
            )}
          </div>
        </div>
      </form>
    </PDefaultContainer>
  );
};

export default Subscribe;
