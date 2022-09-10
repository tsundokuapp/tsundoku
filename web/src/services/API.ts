import axios from 'axios';

const API = axios.create({
    baseURL: 'https://localhost:5001/api/',
});

export default API;
