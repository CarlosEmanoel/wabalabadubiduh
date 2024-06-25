import axios from 'axios';

let API_ENDPOINT = process.env.REACT_APP_ENDPOINT_API_NODE;

if (process.env.NODE_ENV==='production') {
    API_ENDPOINT = 'https://expansaodigital.tec.br/node';
}
const apiNode = axios.create({
  baseURL: API_ENDPOINT
});

export default apiNode;