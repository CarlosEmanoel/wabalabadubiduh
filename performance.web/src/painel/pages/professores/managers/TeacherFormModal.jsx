import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import JoditEditor from 'jodit-react';

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

const TeacherFormModal = ({ closeModal, onSubmit, teacher, uploadFile }) => {
    const [nome, setNome] = useState(""); // Estado para o nome do professor
    const [curriculo, setCurriculo] = useState(""); // Estado para o currículo do professor
    const [file, setFile] = useState(null); // Estado para o arquivo

    // Atualiza os estados com os dados do professor quando é para editar
    useEffect(() => {
        if (teacher) {
            setNome(teacher.nome);
            setCurriculo(teacher.curriculo);
        }
    }, [teacher]);

    /**
     * Manipula a mudança no input de arquivo, salvando o arquivo selecionado no estado.
     * @param {React.ChangeEvent<HTMLInputElement>} event O evento de mudança do input de arquivo.
     */
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    /**
     * Submete os dados do professor e faz o upload do arquivo se necessário.
     * @async
     */
    const handleSubmit = async () => {
        const teacherData = { nome, curriculo };
        const newTeacher = await onSubmit(teacher?.id, teacherData);
        if (file && newTeacher?.id) {
            await uploadFile('professor', newTeacher.id, file);
        }
        closeModal();
    };

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
        <div className={`fixed z-10 inset-0 overflow-y-auto`}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Adicionar/Editar Professor</h3>
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="mt-2 p-2 border w-full"
                            />
                            <label>Currículo:</label>
                            <JoditEditor
                                config={config}
                                ref={editor}
                                value={curriculo}
                                tabIndex={1}
                                onChange={(newContent) => setCurriculo(newContent)}
                            />
                            <input type="file" onChange={handleFileChange} className="mt-2 p-2 border w-full" />
                        </div>
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 hover:bg-blue-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Salvar
                        </button>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

TeacherFormModal.propTypes = {
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

export default TeacherFormModal;