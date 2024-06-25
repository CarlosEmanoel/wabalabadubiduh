import axios from 'axios';
import util from '../services/util';

let API_ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://expansaodigital.tec.br/performance.api';
}
const api = axios.create({
  baseURL: API_ENDPOINT
});

// Configure o token de autorização no cabeçalho da solicitação
api.interceptors.request.use(config => {
  util.startLoading()
  let token = util.getAuthToken();

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  util.stopLoading()
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;