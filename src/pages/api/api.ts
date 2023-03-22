import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api-tsun-teste-assinatura-01.azurewebsites.net/api/',
})

export default API
