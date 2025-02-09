import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.DOCKER_UP
    ? process.env.NEXT_PUBLIC_API_URL_DOCKER
    : process.env.NEXT_PUBLIC_API_URL,
});
