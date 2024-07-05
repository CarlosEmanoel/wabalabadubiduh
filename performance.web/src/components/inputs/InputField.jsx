import React, { useState } from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import util from "../../services/util";
import { PFileFetcher } from "..";

const InputField = ({
  name,
  label,
  icName = "ic_file_image_outlined",
  type = "text",
  rows = 4,
  className = "",
  placeholder = "",
  disabled = false,
  optional = false,
  showIcon = false,
  onBlur = null,
  validate = null,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, setFieldValue, handleBlur, touched, errors } =
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
  const showError = (!!touch && !!error) || !!validate;

  const maskFunctions = {
    cep: (value) => util.mask("cep", value),
    cpf: (value) => util.mask("cpf", value),
    cnpj: (value) => util.mask("cnpj", value),
    telefone: (value) => util.mask("telefone", value),
    money: (value) => util.mask("money", value),
  };

  const applyMask = (type, value) => {
    const maskFunction = maskFunctions[type];
    return maskFunction ? maskFunction(value) : value;
  };

  const handleChange = (e) => {
    const inputValue = applyMask(type, e.target.value);
    setFieldValue(name, inputValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const commonProps = {
    name,
    id: name,
    onChange: handleChange,
    onBlur: onBlur || handleBlur,
    placeholder,
    value: getNestedValue(values, name) || "",
    className: `block w-full px-2 py-2 border-2 group-data-[show-error=true]:border-red-300 border-gray-300 group-data-[show-error=false]:mb-10 appearance-none rounded-md shadow-sm group-data-[show-error=true]:focus:outline-red-500 
    focus:outline-blue-500 focus:border-blue-500 disabled:bg-gray-200 disabled:text-gray-500 group-data-[show-icon=true]:ps-6 ${
      type === "password" ? "pe-7" : "group-data-[show-icon=true]:pe-1"
    }`,
    disabled,
    ...props,
  };

  const InputProps = {
    type: type === "password" && showPassword ? "text" : type,
    ...commonProps,
  };
  const TextAreaProps = { rows, ...commonProps };

  return (
    <div
      data-show-icon={showIcon}
      data-show-error={showError}
      className={`${className} w-full group`}
    >
      <label
        htmlFor={name}
        className="text-sm font-bold group-data-[show-error=true]:text-red-600 text-gray-600  flex items-center"
      >
        {label}
        {optional && (
          <span className="ml-1 text-gray-400 text-xs italic font-normal">
            - Opcional
          </span>
        )}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 start-0 left-0 flex items-center pl-1 text-gray-500 group-data-[show-icon=false]:hidden">
          <PFileFetcher
            className="w-5 h-5 rtl:rotate-[270deg] grayscale"
            fileName={icName}
          />
        </span>
        {type === "textarea" ? (
          <textarea {...TextAreaProps} />
        ) : (
          <input {...InputProps} />
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-1 flex items-center justify-center outline-none"
          >
            {showPassword ? (
              <PFileFetcher
                className="w-6 h-6 text-gray-400 grayscale"
                fileName="ic_security_eye_off_filled"
              />
            ) : (
              <PFileFetcher
                className="w-6 h-6 text-gray-400 filt grayscale"
                fileName="ic_security_eye_on_filled"
              />
            )}
          </button>
        )}
      </div>
      {showError && (
        <p className="text-red-500 text-xs mt-2 mb-4">{error || validate}</p>
      )}
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  showIcon: PropTypes.bool,
  onBlur: PropTypes.func,
  validate: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default InputField;
