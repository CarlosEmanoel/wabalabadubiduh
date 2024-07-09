import React, { useState } from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import util from "../../services/util";
import { PFileFetcher } from "..";

const InputFloatingLabel = ({
  name,
  label,
  icName = "ic_file_image_outlined",
  type = "text",
  rows = 4,
  className = "",
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
    placeholder: " ",
    value: getNestedValue(values, name) || "",
    className: `block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-b-2 group-data-[show-error=true]:border-red-300 border-gray-300 group-data-[show-error=false]:mb-10
     appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 disabled:border-dashed disabled:text-gray-400 peer group-data-[show-icon=true]:ps-6 ${
       type === "password" ? "pe-6" : "group-data-[show-icon=true]:pe-1"
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
    <>
      <div
        data-show-error={showError}
        data-show-icon={showIcon}
        className={`relative z-0 ${className} group`}
      >
        <span className="absolute start-0 bottom-2.5 text-gray-500 group-data-[show-icon=false]:hidden">
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
            className="absolute inset-y-0 right-0 flex items-center justify-center outline-none"
          >
            {showPassword ? (
              <>
                <PFileFetcher
                  className="w-6 h-6 text-gray-400 grayscale"
                  fileName="ic_security_eye_off_filled"
                />
                {/* <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.2954 6.31083C22.6761 6.474 22.8524 6.91491 22.6893 7.29563L21.9999 7.00019C22.6893 7.29563 22.6894 7.29546 22.6893 7.29563L22.6886 7.29731L22.6875 7.2998L22.6843 7.30716L22.6736 7.33123C22.6646 7.35137 22.6518 7.37958 22.6352 7.41527C22.6019 7.48662 22.5533 7.58794 22.4888 7.71435C22.3599 7.967 22.1675 8.32087 21.9084 8.73666C21.4828 9.4197 20.8724 10.2778 20.0619 11.1304L21.0303 12.0987C21.3231 12.3916 21.3231 12.8665 21.0303 13.1594C20.7374 13.4523 20.2625 13.4523 19.9696 13.1594L18.969 12.1588C18.3093 12.7115 17.5528 13.2302 16.695 13.6564L17.6286 15.0912C17.8545 15.4383 17.7562 15.9029 17.409 16.1288C17.0618 16.3547 16.5972 16.2564 16.3713 15.9092L15.2821 14.2353C14.5028 14.4898 13.659 14.6628 12.7499 14.7248V16.5002C12.7499 16.9144 12.4141 17.2502 11.9999 17.2502C11.5857 17.2502 11.2499 16.9144 11.2499 16.5002V14.7248C10.3689 14.6647 9.54909 14.5004 8.78982 14.2586L7.71575 15.9093C7.48984 16.2565 7.02526 16.3548 6.67807 16.1289C6.33089 15.903 6.23257 15.4384 6.45847 15.0912L7.37089 13.689C6.5065 13.2668 5.74381 12.7504 5.07842 12.1984L4.11744 13.1594C3.82455 13.4523 3.34968 13.4523 3.05678 13.1594C2.76389 12.8665 2.76389 12.3917 3.05678 12.0988L3.98055 11.175C3.15599 10.3153 2.53525 9.44675 2.10277 8.75486C1.83984 8.33423 1.6446 7.97584 1.51388 7.71988C1.44848 7.59182 1.3991 7.48914 1.36537 7.41683C1.3485 7.38067 1.33553 7.35207 1.32641 7.33167L1.31562 7.30729L1.31238 7.29984L1.31129 7.29733L1.31088 7.29638C1.31081 7.2962 1.31056 7.29563 1.99992 7.00019L1.31088 7.29638C1.14772 6.91565 1.32376 6.474 1.70448 6.31083C2.08489 6.1478 2.52539 6.32374 2.68888 6.70381C2.68882 6.70368 2.68894 6.70394 2.68888 6.70381L2.68983 6.706L2.69591 6.71972C2.7018 6.73291 2.7114 6.7541 2.72472 6.78267C2.75139 6.83983 2.79296 6.92644 2.84976 7.03767C2.96345 7.26029 3.13762 7.58046 3.37472 7.95979C3.85033 8.72067 4.57157 9.70728 5.55561 10.6218C6.42151 11.4265 7.48259 12.1678 8.75165 12.656C9.70614 13.0232 10.7854 13.2502 11.9999 13.2502C13.2416 13.2502 14.342 13.013 15.3124 12.631C16.5738 12.1345 17.6277 11.3884 18.4866 10.5822C19.4562 9.67216 20.1668 8.69535 20.6354 7.9434C20.869 7.5685 21.0405 7.25246 21.1525 7.03286C21.2085 6.92315 21.2494 6.83776 21.2757 6.78144C21.2888 6.75328 21.2983 6.73242 21.3041 6.71943L21.31 6.70595L21.3106 6.70475C21.3105 6.70485 21.3106 6.70466 21.3106 6.70475M22.2954 6.31083C21.9147 6.14771 21.4738 6.32423 21.3106 6.70475L22.2954 6.31083ZM2.68888 6.70381C2.68882 6.70368 2.68894 6.70394 2.68888 6.70381V6.70381Z"
                    fill="#1C274C"
                  />
                </svg> */}
              </>
            ) : (
              <>
                <PFileFetcher
                  className="w-6 h-6 text-gray-400 filt grayscale"
                  fileName="ic_security_eye_on_filled"
                />
                {/* <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                fill="#1C274C"
                />
                <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z"
                fill="#1C274C"
                />
                </svg> */}
              </>
            )}
          </button>
        )}
        <label
          htmlFor={name}
          className="flex items-center absolute text-sm group-data-[show-error=true]:text-red-500 peer-disabled:text-gray-400 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] group-data-[show-icon=true]:peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {label}
          {optional && (
            <span className="ml-1 text-gray-400 text-xs italic font-normal">
              - Opcional
            </span>
          )}
        </label>
      </div>
      {showError && (
        <p className="text-red-500 text-xs mt-2 mb-4">{error || validate}</p>
      )}
    </>
  );
};

InputFloatingLabel.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  showIcon: PropTypes.bool,
  onBlur: PropTypes.func,
  validate: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default InputFloatingLabel;
