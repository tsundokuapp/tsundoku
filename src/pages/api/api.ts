import axios from "axios";
// TODO: Salvar a URL da API em um arquivo de configuração
const API = axios.create({
  baseURL: "https://api-tsun-teste-assinatura-01.azurewebsites.net/api/",
});

export default API;
