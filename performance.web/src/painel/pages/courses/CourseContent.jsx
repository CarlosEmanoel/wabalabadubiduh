import React, { useEffect, useState, useRef } from "react";
import { useFormikContext } from "formik";
import {
  PFileThumbnail,
  PInpuCheckboxToggle,
  PInputField,
  PSelect,
} from "../../../components";

const CourseContent = () => {
  const { values, errors, touched, setValues, setFieldTouched } =
    useFormikContext();

  const [listUFs, setListUFs] = useState([]);
  const [listCities, setListCities] = useState([]);

  const timeoutRef = useRef();

  const toggleLevel = (name) => {
    const updatedValues = {
      ...values,
      [name]: !values[name],
      ...(name === "isNotNivel"
        ? {
            isBasic: false,
            isIntermediary: false,
            isAdvanced: false,
            basicForm: {},
            intermediaryForm: {},
            advancedForm: {},
            notNivelForm: values[name] ? values.notNivelForm : {},
          }
        : {
            isNotNivel: false,
            notNivelForm: {},
          }),
    };

    updatedValues.levelSelected =
      updatedValues.isNotNivel ||
      updatedValues.isBasic ||
      updatedValues.isIntermediary ||
      updatedValues.isAdvanced;

    setValues(updatedValues);
    setTimeout(() => setFieldTouched("levelSelected", true, false), 50);
  };

  useEffect(() => {
    const fetchUFs = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        const data = await response.json();
        const formattedUFs = data.map((uf) => ({
          value: uf.sigla,
          label: `${uf.sigla} - ${uf.nome}`,
        }));
        setListUFs(formattedUFs);
      } catch (error) {
        console.error("Erro ao obter as UFs:", error);
      }
    };

    fetchUFs();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (values.uf) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${values.uf}/municipios`
          );
          const data = await response.json();
          const formattedCities = data.map((city) => ({
            value: city.nome,
            label: city.nome,
          }));
          setListCities(formattedCities);
        } catch (error) {
          console.error("Erro ao obter as cidades:", error);
        }
      };

      fetchCities();
    }
  }, [values.uf]);

  const handleUFChange = (event) => {
    const selectedUF = event.target.value;
    setValues({ ...values, uf: selectedUF, municipio: "" });
  };

  const handleFileChange = (event) => {
    setValues({ ...values, selectedFile: event.target.files[0] });
  };

  const statusOptions = [
    { value: true, label: "Ativo" },
    { value: false, label: "Inativo" },
  ];

  return (
    <div className="w-full px-2 mb-4 border border-slate-400 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 py-2 text-center border-b-2 border-gray-200 rounded-t-lg">
        Dados Gerais
      </h2>
      <div className="flex flex-col justify-center items-center space-y-6 mb-4">
        <div className="shrink-0">
          <PFileThumbnail
            className="h-64 w-64 object-cover rounded-lg"
            fileName={`public/images/curso-${values.id}`}
          />
        </div>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                  "
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {["titulo", "subtitulo"].map((field) => (
          <PInputField
            key={field}
            name={field}
            label={field === "titulo" ? "Título" : "Subtítulo"}
            type="text"
            className="mb-4"
          />
        ))}
      </div>

      <PInputField
        name={`descricao`}
        label="Descrição"
        type="textarea"
        className="mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <PSelect
          name="uf"
          label="Estado"
          lista={listUFs}
          required
          onChange={handleUFChange}
          className="mb-4"
        />
        <PSelect
          name="municipio"
          label="Cidade"
          lista={listCities}
          required
          className="mb-4"
        />
        <PInputField
          name="endereco"
          label="Endereço"
          type="text"
          className="mb-4"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {["dataInicio", "dataFim"].map((field) => (
          <PInputField
            key={field}
            name={field}
            label={field === "dataInicio" ? "Data de Início" : "Data de Fim"}
            type="date"
            className="mb-4"
          />
        ))}
        <PSelect
          name="isActive"
          label="Status"
          lista={statusOptions}
          required
          className="mb-4"
        />
      </div>

      <div className="my-3">
        <label className="block text-sm font-bold text-gray-600">
          Selecione abaixo os níveis desejados para esse curso:
        </label>
        <div className="flex flex-wrap -mx-2">
          {[
            { name: "isNotNivel", label: "Nenhum" },
            { name: "isBasic", label: "Básico" },
            { name: "isIntermediary", label: "Intermediário" },
            { name: "isAdvanced", label: "Avançado" },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center space-x-2 px-2 my-2"
            >
              <label>{item.label}</label>
              <PInpuCheckboxToggle
                name={item.name}
                value={values[item.name]}
                onChange={() => toggleLevel(item.name)}
              />
            </div>
          ))}
        </div>
        {touched.levelSelected && errors.levelSelected && (
          <div className="text-red-500 text-xs mt-2">
            {errors.levelSelected}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
