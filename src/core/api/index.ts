import axios from 'axios';

import { selectAPI, selectAuthAPI } from './request';

const timeout = 10000;

export const api = axios.create({
  baseURL: selectAPI(),
  timeout: timeout,
});

export const apiPrivate = axios.create({
  baseURL: selectAPI(),
  timeout: timeout,
  withCredentials: true,
});

export const auth = axios.create({
  baseURL: selectAuthAPI(),
  timeout: timeout,
  withCredentials: true,
});
