import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import JoditEditor from 'jodit-react';
import { useFormikContext } from 'formik';
import { PInputField } from '../../../../components';

/**
 * Modal para adicionar ou editar informações de um professor.
 * 
 * @param {Object} props As propriedades do componente.
 * @param {Function} props.closeModal Função para fechar o modal.
 * @param {Function} props.onSubmit Função para submeter os dados do professor. Deve ser uma função async.
 * @param {Object|null} props.teacher Objeto contendo os dados do professor quando está editando, ou null quando está adicionando.
 * @param {Function} props.uploadFile Função para fazer upload de arquivos.
 * @returns {JSX.Element} O JSX do modal.
 */

const TeacherForm = () => {
    const { values, setValues, setFieldValue } = useFormikContext();

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


    /**
     * Manipula a mudança no input de arquivo, salvando o arquivo selecionado no estado.
     * @param {React.ChangeEvent<HTMLInputElement>} event O evento de mudança do input de arquivo.
     */
    const handleFileChange = (event) => {
        setValues({ ...values, file: event.target.files[0] });
    };
    return (
        <>
            <PInputField
                label="Nome"
                name="nome"
                placeholder='Digite o nome do professor'
            />
            <label
                className={`text-sm font-bold text-gray-600 flex items-center`}
            >
                Currículo
            </label>
            <JoditEditor
                config={config}
                ref={editor}
                value={values.curriculo}
                tabIndex={1}
                onChange={(newContent) => setFieldValue("curriculo", newContent)}
            />
            <input type="file" onChange={handleFileChange} className="mt-2 p-2 border w-full" />
        </>
    );
};

TeacherForm.propTypes = {
    closeModal: PropTypes.func.isRequired, // Propriedade closeModal: função chamada para fechar o modal (obrigatória)
    onSubmit: PropTypes.func.isRequired, // Propriedade onSubmit: função chamada quando o formulário é submetido (obrigatória)
    // Propriedade teacher: objeto que representa os dados do professor (opcional)
    teacher: PropTypes.shape({
        id: PropTypes.string, // Chave id: uma string que identifica exclusivamente o professor
        nome: PropTypes.string, // Chave nome: uma string que representa o nome do professor
        curriculo: PropTypes.string, // Chave curriculo: uma string que representa o currículo do professor
    }),
    uploadFile: PropTypes.func.isRequired, // Propriedade uploadFile: função chamada para fazer upload de arquivos (obrigatória)
};

export default TeacherForm;