import api from "../../services/api";
const useFileUpload = () => {
  /**
   * Obtém a extensão de um arquivo com base no seu nome.
   * @param {string} filename O nome do arquivo.
   * @returns {string} A extensão do arquivo.
   */
  function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  }

  /**
   * Faz o upload de um arquivo para a API.
   * @async
   * @param {number} entityType O tipo da entidade para o nome base do arquivo.
   * @param {number} id O ID da entidade para o nome base do arquivo.
   * @param {File} file O arquivo a ser enviado.
   */
  const fileUpload = async (entityType, id, file) => {
    const extension = getFileExtension(file.name);
    const baseName = `${entityType}-${id}`; /* ESTA LINHA DEFINE O TIPO (PREFIXO), E O NOME SENDO O ID, (SUFIXO), PARA DETERMINAR SE O ARQUIVO DEVE SER SOBREPOSTO */
    const formData = new FormData();
    formData.append("baseName", baseName);
    formData.append("publico", true);
    formData.append("file", file, `${baseName}.${extension}`);

    try {
      await api.post(`/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
  };

  return fileUpload;
};

export default useFileUpload;
