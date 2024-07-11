import React, { useRef, useState } from "react";
import { useFormikContext } from "formik";
import JoditEditor from "jodit-react";
import { PInputField } from "../../../components";

const NivelForm = ({ nivel, title }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } =
    useFormikContext();

  const editor = useRef(null);

  const [config] = useState({
    language: "pt_br",
    showPlaceholder: false,
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    toolbarButtonSize: "large",
    minHeight: 300,
    maxHeight: 500,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "paragraph",
      "|",
      "font",
      "fontsize",
      "lineHeight",
      "|",
      "superscript",
      "subscript",
      "symbols",
      "|",
      "link",
      "unlink",
      "|",
      "outdent",
      "indent",
      "align",
      "|",
      "table",
      "|",
      "undo",
      "redo",
      "cut",
      "copy",
      "paste",
      "selectall",
      "eraser",
      "|",
      "brush",
      "|",
      "hr",
      "fullsize",
      "spellcheck",
      "preview",
      "find",
    ],
  });

  return (
    <>
      {title && (
        <h6 className="font-semibold text-gray-400 py-2 border-solid border-b-2 border-gray-200 ">
          Dados Nível {title}
        </h6>
      )}
      <div className="grid grid-col-1 lg:grid-cols-5 gap-4">
        <PInputField
          name={`${nivel}.publicoAlvo`}
          label="Público Alvo"
          className="col-span-4"
        />
        <div className="col-span-1">
          <PInputField name={`${nivel}.valor`} label="Valor" type="money" />
        </div>
      </div>
      <PInputField
        name={`${nivel}.descricao`}
        label="Descrição"
        type="textarea"
        rows={4}
        className="my-3"
      />
      <div className="my-3">
        <label
          htmlFor="conteudo"
          className="ext-sm font-bold text-gray-600 block"
        >
          Conteúdo
        </label>
        <JoditEditor
          config={config}
          ref={editor}
          value={values[nivel]?.conteudo}
          tabIndex={1}
          onBlur={() => {
            setFieldTouched(`${nivel}.conteudo`, true, true);
            setFieldValue(`${nivel}.conteudo`, editor.current.value);
          }}
          onChange={(novoConteudo) => {
            setFieldValue(`${nivel}.conteudo`, novoConteudo);
          }}
        />
        {errors[nivel]?.conteudo && touched[nivel]?.conteudo && (
          <span className="p-1 text-sm text-red-500">
            {errors[nivel].conteudo}
          </span>
        )}
      </div>
    </>
  );
};

export default NivelForm;
