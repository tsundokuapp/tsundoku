import axios from 'axios';

export const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: 'https://localhost:8081/api',
});
