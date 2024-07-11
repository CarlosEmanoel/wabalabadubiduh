import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Modal para upload de arquivo que permite ao usuário escolher um arquivo e atribuir um nome antes de fazer o upload.
 *
 * @param {Object} props Propriedades passadas para o componente.
 * @param {string} props.fileName Nome do arquivo, controlado externamente.
 * @param {Function} props.changeName Função para atualizar o nome do arquivo.
 * @param {Function} props.handleFileUpload Função para manejar o upload do arquivo escolhido.
 * @param {Function} props.closeModal Função para fechar o modal.
 * @param {boolean} props.isModalOpen Estado que controla a visibilidade do modal.
 * @returns {JSX.Element} Retorna o JSX do modal de upload de arquivo.
 */

const FileUploadModal = ({ fileName, changeName, handleFileUpload, closeModal, isModalOpen }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [privacy, setPrivacy] = useState(true);

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const onUploadButtonClick = () => {
        if (selectedFile && fileName.trim()) {
            handleFileUpload(selectedFile, fileName.trim(), privacy);
            setSelectedFile(null);
        }
    };
    // Determina se o botão deve ser desativado ou não.
    const isDisabled = !selectedFile || !fileName.trim();

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isModalOpen ? 'block' : 'hidden'}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Adicionar Arquivo</h3>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf,.mp4,.mov,.avi,.svg,.webp"
                            onChange={onFileChange}
                        />
                        <input
                            type="text"
                            placeholder="Digite um nome para o arquivo"
                            value={fileName}
                            onChange={changeName}
                            className="mt-2 p-2 border w-full"
                        />
                        <select value={privacy} onChange={e => setPrivacy(e.target.value)} className="mb-4">
                            <option value={true}>Público</option>
                            <option value={false}>Privado</option>
                        </select>
                        <button
                            onClick={onUploadButtonClick}
                            disabled={isDisabled}
                            className={`mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${isDisabled ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            Upload
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

FileUploadModal.propTypes = {
    fileName: PropTypes.string.isRequired, // Exige que fileName seja uma string e que seja obrigatório
    changeName: PropTypes.func.isRequired, // Exige que changeName seja uma função e que seja obrigatório
    handleFileUpload: PropTypes.func.isRequired, // Exige que handleFileUpload seja uma função e que seja obrigatório
    closeModal: PropTypes.func.isRequired, // Exige que closeModal seja uma função e que seja obrigatório
    isModalOpen: PropTypes.bool.isRequired // Exige que isModalOpen seja um booleano e que seja obrigatório
};

export default FileUploadModal;
