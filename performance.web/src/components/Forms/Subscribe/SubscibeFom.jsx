import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import useLocationSearch from "../../../hooks/responses/useLocationSearch";
import { PInputField, PSelect } from "../..";

const typesDocument = [
  { value: 1, label: "CNPJ" },
  { value: 2, label: "CPF" },
];

const SubscribeForm = () => {
  const { values, setValues, touched, setFieldTouched, errors } =
    useFormikContext();
  const { fetchCep, fetchUfs } = useLocationSearch();
  const [isValidCep, setIsValidCep] = useState(true);

  useEffect(() => {
    if (values.cep && values.cep.length === 10) {
      fetchAddressByCep(values.cep);
    }
  }, [values.cep]);

  const fetchAddressByCep = async (cep) => {
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
        invalidateCep();
      }
    } catch (error) {
      invalidateCep();
    } finally {
      setFieldTouched("cep", true, false);
    }
  };

  const invalidateCep = () => {
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
    <div className="flex flex-wrap justify-between">
      <PInputField
        name="nome"
        label="Nome Completo"
        placeholder="Digite seu nome completo"
        className="lg:w-[57%] xl:w-full"
      />
      <PInputField
        name="cargo"
        label="Seu Cargo"
        placeholder="Digite seu cargo"
        optional
        className="lg:w-[41%] xl:w-[49%]"
      />
      <PInputField
        name="telefone"
        type="telefone"
        label="Seu Telefone"
        placeholder="Digite seu telefone"
        className="md:w-[49%] xl:w-[24.5%]"
      />

      <PInputField
        name="email"
        label="Seu E-mail"
        placeholder="Digite seu e-mail"
        className="md:w-[49%] xl:w-[24.5%]"
      />

      <PSelect
        name="typeDocument"
        label="Tipo do Documento"
        lista={typesDocument}
        required
        onChange={handleTypeChange}
        className="md:w-[33%]"
      />

      {values.typeDocument === "1" && (
        <PInputField
          name="cnpj"
          type="cnpj"
          label="CNPJ Para Emissão da Nota Fiscal"
          placeholder="Digite o CNPJ"
          className="md:w-[66%]"
        />
      )}
      {values.typeDocument === "2" && (
        <>
          <PInputField
            name="cpf"
            type="cpf"
            label="Seu CPF"
            placeholder="Digite seu CPF"
            className="md:w-[32.5%]"
          />

          <PInputField
            name="cep"
            mask="cep"
            label="Seu CEP"
            placeholder="Digite seu CEP"
            validate={
              !isValidCep && touched.cep && !errors.cep ? "CEP inválido" : ""
            }
            className="md:w-[32.5%]"
          />
        </>
      )}
      {values.typeDocument === "2" && (
        <div className="flex flex-wrap justify-between w-full">
          <PInputField
            name="estado"
            label="Seu Estado"
            placeholder="Digite seu estado"
            disabled
            className="md:w-full lg:w-[49%] xl:w-[32.4%]"
          />

          <PInputField
            name="municipio"
            label="Seu Município"
            placeholder="Digite seu município"
            disabled
            className="md:w-full lg:w-[49%] xl:w-[32.4%]"
          />

          <PInputField
            name="bairro"
            label="Seu Bairro"
            placeholder="Digite seu bairro"
            className="md:w-full xl:w-[32.4%]"
          />

          <PInputField
            name="endereco"
            label="Seu Endereço"
            placeholder="Digite seu endereço"
          />
        </div>
      )}
      {values.typeDocument === "1" && (
        <PInputField
          name="unidadegestora"
          label="Unidade Gestora"
          placeholder="Digite sua unidade gestora"
        />
      )}
    </div>
  );
};

export default SubscribeForm;
