import axios from 'axios';
import util from '../services/util';

let API_ENDPOINT = process.env.REACT_APP_ENDPOINT_API + 'files/';

const fileApi = axios.create({
  baseURL: API_ENDPOINT
});

fileApi.interceptors.request.use(config => {
  util.startLoading();
  let token = util.getAuthToken();

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  util.stopLoading();
  return config;
}, error => {
  return Promise.reject(error);
});

export default fileApi;
