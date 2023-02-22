import axios from 'axios';

const API = axios.create({
    //baseURL: 'https://localhost:5001/api/',
    baseURL: 'https://api-tsun-teste-assinatura-01.azurewebsites.net/api/'
});

export default API;
