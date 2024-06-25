import React from "react";
import { useFormikContext } from "formik";

const SelectField = ({
  name,
  label,
  className,
  lista,
  required,
  onChange,
  ...props
}) => {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext();

  /*
   getNestedValue é uma função que facilita o acesso a propriedades aninhadas dentro de um objeto.
   Isso é particularmente útil para lidar com as estruturas de dados do Formik, onde os campos de formulário
   podem ser aninhados e precisamos acessar erros e estados de 'touched' de forma dinâmica.
   'path' é uma string que representa o caminho até o valor desejado dentro do objeto (ex.: "basicForm.publicoAlvo").
   'obj' é o objeto base de onde o valor será extraído (por exemplo, errors ou touched do Formik).
   A função usa 'split' para dividir a string de caminho em partes individuais e 'reduce' para percorrer essas partes,
   acessando sequencialmente as propriedades aninhadas. Em cada etapa, verifica se o acumulador (acc) ainda é definido
   para evitar erros de acesso a propriedades de 'undefined'.
   */
  const getNestedValue = (obj, path) =>
    path.split(".").reduce((acc, part) => acc && acc[part], obj);

  /*
   Usamos getNestedValue para acessar dinamicamente os erros e estados de 'touched' para campos específicos,
   permitindo que nossa UI responda corretamente mostrando mensagens de erro e outros indicativos visuais
   em campos aninhados dentro de estruturas complexas de dados. Por exemplo, para um campo nomeado 'basicForm.publicoAlvo',
   getNestedValue permite acessar 'errors.basicForm.publicoAlvo' e 'touched.basicForm.publicoAlvo' corretamente.
   */
  const error = getNestedValue(errors, name);
  const touch = getNestedValue(touched, name);

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-bold text-gray-600">
        {label}
      </label>
      <select
        name={name}
        id={name}
        onChange={onChange ? onChange : handleChange}
        onBlur={handleBlur}
        value={getNestedValue(values, name)}
        className={`mt-1 block w-full p-2 border ${
          touch && error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        {...props}
      >
        <option disabled={required} value={""}>
          Selecione uma opção
        </option>
        {lista.map((opcao) => (
          <option value={opcao.value}>{opcao.label}</option>
        ))}
      </select>
      {touch && error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default SelectField;
