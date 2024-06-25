import React, { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";
import FileUploadModal from "./managers/FileUploadModal";
import { useNavigate } from "react-router-dom";
import FileList from "./managers/FileList";
import { PContent } from "../../../components";

/**
 * Componente que gerencia a interface para o upload, exibição, e exclusão de arquivos.
 * Oferece funcionalidades como adicionar novos arquivos, visualizar arquivos expandidos,
 * e remover arquivos do servidor.
 * @component
 * @returns {React.Component} O componente pai, de gerenciamento de arquivos.
 * @returns {React.Component.FileList} O componente de listagem de arquivos.
 * @returns {React.Component.FileUploadModal} O componente que abre o modal para que o usuário possa selecionar e enviar os arquivos.
 * @param {boolean} "expandedContent", que define se o usuário clicou ou não na miniatura e então, expande o arquivo selecionado.
 * @returns {JSX.Element} Se o "expandedContent" for "true", então, este JSX renderiza o conteúdo. 
 * 
 */

const FileManagementScreen = () => {
  const navigate = useNavigate(); // Estado que inicializa a navegação
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedContent, setExpandedContent] = useState(null);
  console.log("Arquivos em FileManagementScreen: ", files)
  const [isLoading, setIsLoading] = useState(false);
  /**
   * Carrega a lista de arquivos do servidor utilizando a API.
   */
  const loadFiles = useCallback(async () => {
    try {
      const response = await api.get(`/upload/list/`);
      const filesWithId = response.data.map((file, index) => ({
        ...file,
        id: index,
      }));
      setFiles(filesWithId);
    } catch (error) {
      console.error("Erro ao carregar arquivos:", error);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);
  /**
   * Manipula a mudança de nome do arquivo.
   * @param {React.ChangeEvent<HTMLInputElement>} event O evento de mudança.
   */
  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };
  /**
   * Realiza o upload de um arquivo para o servidor.
   * @param {File} file O arquivo a ser enviado.
   * @param {string} name O nome base do arquivo.
   */
  const handleFileUpload = async (file, name, privacy) => {
    setIsLoading(true);
    if (!file) return;

    const formData = new FormData();
    formData.append("baseName", name);
    formData.append("publico", privacy);
    formData.append("file", file);

    try {
      const response = await api.post("/upload", formData);
      if (response.status === 201) {
        setFileName("");
        closeModal();
        loadFiles();
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };
  /**
   * Deleta um arquivo no servidor.
   * @param {number} id - Identificador do arquivo para deleção.
   */
  const deleteFile = async (id) => {
    try {
      const response = await api.delete(`/upload/${id}`);
      if (response.status === 200) {
        navigate(0);
      } else {
        console.error("Falha ao deletar arquivo:", response.data.error);
      }
    } catch (error) {
      console.error("Erro ao deletar arquivo:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  /**
   * Formata o tamanho do arquivo em uma string legível.
   * @param {number} bytes - Tamanho do arquivo em bytes.
   * @param {number} decimalPoint - Número de casas decimais no resultado formatado.
   * @returns {string} Tamanho do arquivo formatado.
   */
  function formatFileSize(bytes, decimalPoint = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024,
      dm = decimalPoint <= 0 ? 0 : decimalPoint,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <PContent>
      <div className="mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Arquivos</h1>
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Adicionar Arquivo
          </button>
        </div>
        <FileList
          files={files}
          setExpandedContent={setExpandedContent}
          deleteFile={deleteFile}
          formatFileSize={formatFileSize}
        />
        {isModalOpen && (
          <FileUploadModal
            fileName={fileName}
            disabled={isLoading}
            changeName={handleFileNameChange}
            handleFileUpload={handleFileUpload}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
          />
        )}
        {expandedContent && (
          <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
            onClick={() => setExpandedContent(null)}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            {expandedContent.endsWith(".pdf") ? (
              <iframe
                src={expandedContent}
                className="h-full w-1/2"
                title="PDF Viewer"
              />
            ) : expandedContent.endsWith(".mp4") ||
              expandedContent.endsWith(".mov") ||
              expandedContent.endsWith(".avi") ? (
              <video
                src={expandedContent}
                className="max-h-full max-w-full"
                alt="Imagem Expandida"
                controls
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={expandedContent}
                className="max-h-full max-w-full"
                alt="Imagem Expandida"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        )}
      </div>
    </PContent>
  );
};

export default FileManagementScreen;
