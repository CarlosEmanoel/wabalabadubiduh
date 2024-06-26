import fileApi from "../../services/fileApi";
import util from "../../services/util";

const fileFetcherUrlHook = async (fileName, setFileUrl, setMimeType, createTempUrl = true) => {
  util.startLoading()
  try {
    const response = await fileApi.get(`/${fileName}`, { responseType: 'blob' });
    const mimeType = response.headers['content-type'];

    if (createTempUrl) {
      /* Cria uma URL temporária para o blob recebido, com o tipo de conteúdo apropriado */
      const url = window.URL.createObjectURL(new Blob([response.data], { type: mimeType }));
      /* Define a URL temporária no estado usando a função setFileUrl */
      setFileUrl(url);
    } else {
      /* Define a URL direta do arquivo no estado (supondo que a URL base esteja configurada corretamente) */
      setFileUrl(fileApi.defaults.baseURL + fileName + '?t=' + Date.now());
    }
    util.stopLoading()
    setMimeType(mimeType)
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn(`Arquivo ${fileName} não encontrado na base de dados.`);
    } else {
      console.error("Erro ao buscar o arquivo!", error);
    }
  }
};

export default fileFetcherUrlHook;
