import React, { useEffect, useState } from "react";
import { PInputField, PSelect } from "../..";
import { useFormikContext } from "formik";
import useSendEmail from "../../../hooks/responses/useSendEmail";
import useLocationSearch from "../../../hooks/responses/useLocationSearch";

const typesDocument = [
  { value: 1, label: "CNPJ" },
  { value: 2, label: "CPF" },
];

const SubscribeForm = () => {
  const { values, setValues, touched, setFieldTouched, errors } =
    useFormikContext();
  const { cepLoading, cepError, fetchCep, fetchUfs } = useLocationSearch();
  const [isValidCep, setIsValidCep] = useState(true);

  //   const { sendEmail, success } = useSendEmail();
  //   const emailData = {
  //     subject: "Confirmação de Inscrição",
  //     body: `
  //         Olá ${inscricao.nome},

  //         Parabéns! Sua inscrição foi realizada com sucesso. Seguem abaixo os detalhes da sua inscrição:

  //         Nome: ${inscricao.nome}
  //         E-mail: ${inscricao.email}
  //         Telefone: ${inscricao.telefone}
  //         CNPJ: ${inscricao.cnpj}
  //         Unidade Gestora: ${inscricao.unidadegestora}
  //         Cargo: ${inscricao.cargo}
  //         Endereço: ${inscricao.endereco}
  //         Bairro: ${inscricao.bairro}
  //         Município: ${inscricao.municipio}
  //         Estado: ${inscricao.estado}
  //         CEP: ${inscricao.cep}

  //         Estamos entusiasmados por tê-lo(a) em nosso curso e esperamos que esta experiência seja enriquecedora e gratificante.

  //         Em breve, enviaremos mais informações sobre o curso e outras orientações importantes. Caso tenha alguma dúvida, não hesite em nos contatar através deste e-mail.

  //         Agradecemos a sua inscrição!

  //         Atenciosamente,
  //         Equipe Performance Goiânia
  //     `,
  //     from: "inscricao@performance.goiania.br",
  //     to: inscricao.email,
  //   };
  //   async function sendResponse() {
  //     await sendEmail(emailData);
  //     console.log(success);
  //   }

  const handleCepBlur = async (e) => {
    const cep = e.target.value;
    try {
      const response = await fetchCep(cep);
      if (response) {
        const listUfs = await fetchUfs();
        const uf = listUfs.find((uf) => uf.sigla === response.uf);
        setValues((prevValues) => ({
          ...prevValues,
          endereco: response.logradouro,
          bairro: response.bairro,
          municipio: response.cidade,
          estado: uf ? uf.nome : "",
        }));
        setIsValidCep(true);
      } else {
        handleCepError();
      }
    } catch (error) {
      handleCepError();
    } finally {
      setFieldTouched("cep", true, false);
    }
  };

  const handleCepError = () => {
    setValues((prevValues) => ({
      ...prevValues,
      endereco: "",
      bairro: "",
      municipio: "",
      estado: "",
    }));
    setIsValidCep(false);
  };

  const handleTypeChange = (event) => {
    setValues({ ...values, typeDocument: event.target.value });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:gap-10">
        <div className="w-full">
          <PInputField
            name="nome"
            label="Nome Completo"
            placeholder="Digite seu nome completo"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-10">
        <div className="w-full">
          <PInputField
            name="cargo"
            label="Seu Cargo"
            placeholder="Digite seu cargo"
            optional
          />
        </div>
      </div>
      <div className="flex-wrap">
        <div className="w-full">
          <PInputField
            name="telefone"
            type="telefone"
            label="Seu Telefone"
            placeholder="Digite seu telefone"
          />
        </div>
        <div className="w-full">
          <PInputField
            name="email"
            label="Seu E-mail"
            placeholder="Digite seu e-mail"
          />
        </div>
        <div className="w-full">
          <PSelect
            name="typeDocument"
            label="Tipo do Documento"
            lista={typesDocument}
            required
            onChange={handleTypeChange}
          />
        </div>
        {values.typeDocument === "1" && (
          <div className="w-full">
            <PInputField
              name="cnpj"
              type="cnpj"
              label="CNPJ Para Emissão da Nota Fiscal"
              placeholder="Digite o CNPJ"
            />
          </div>
        )}
        {values.typeDocument === "2" && (
          <>
            <div className="w-full">
              <PInputField
                name="cpf"
                type="cpf"
                label="Seu CPF"
                placeholder="Digite seu CPF"
              />
            </div>
            <div className="w-full">
              <PInputField
                name="cep"
                mask="cep"
                label="Seu CEP"
                placeholder="Digite seu CEP"
                onBlur={handleCepBlur}
                validate={
                  !isValidCep && touched.cep && !errors.cep
                    ? "CEP inválido"
                    : ""
                }
              />
            </div>
          </>
        )}
      </div>
      {values.typeDocument === "2" && (
        <>
          <div className="w-full">
            <PInputField
              name="estado"
              label="Seu Estado"
              placeholder="Digite seu estado"
              disabled
            />
          </div>
          <div className="w-full">
            <PInputField
              name="municipio"
              label="Seu Município"
              placeholder="Digite seu município"
              disabled
            />
          </div>
          <div className="w-full">
            <PInputField
              name="bairro"
              label="Seu Bairro"
              placeholder="Digite seu bairro"
            />
          </div>
          <div className="w-full">
            <PInputField
              name="endereco"
              label="Seu Endereço"
              placeholder="Digite seu endereço"
            />
          </div>
        </>
      )}
      {values.typeDocument === "1" && (
        <div className="flex flex-col w-full">
          <div className="w-full">
            <PInputField
              name="unidadegestora"
              label="Unidade Gestora"
              placeholder="Digite sua unidade gestora"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SubscribeForm;
