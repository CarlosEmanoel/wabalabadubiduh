import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

const SelectField = ({
  name,
  label,
  className = "",
  lista,
  required = false,
  onChange,
  disabled = false,
  optional = false,
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
  const showError = !!touch && !!error;

  return (
    <div data-show-error={showError} className={`${className} w-full group`}>
      <label
        htmlFor={name}
        className="block text-sm font-bold group-data-[show-error=true]:text-red-600 text-gray-600"
      >
        {label}
        {optional && (
          <span className="ml-1 text-gray-400 text-xs italic font-normal">
            - Opcional
          </span>
        )}
      </label>
      <select
        name={name}
        id={name}
        onChange={onChange || handleChange}
        onBlur={handleBlur}
        value={getNestedValue(values, name)}
        disabled={disabled}
        className={`block w-full px-2 py-2 border-2 group-data-[show-error=true]:border-red-300 border-gray-300 group-data-[show-error=false]:mb-10 appearance-none 
                    rounded-md shadow-sm group-data-[show-error=true]:focus:outline-red-500 disabled:bg-gray-200 disabled:text-gray-500
                  focus:outline-blue-500 focus:border-blue-500`}
        {...props}
      >
        <option disabled={required} value="">
          Selecione uma opção
        </option>
        {lista.map((opcao, index) => (
          <option key={index} value={opcao.value}>
            {opcao.label}
          </option>
        ))}
      </select>
      {showError && <p className="text-red-500 text-xs mt-2 mb-4">{error}</p>}
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  lista: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
};

export default SelectField;
