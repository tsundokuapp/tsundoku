import axios from 'axios';

import { selectAPI, selectAuthAPI } from './request';

export const api = axios.create({
  baseURL: selectAPI(),
});

export const apiPrivate = axios.create({
  baseURL: selectAPI(),
  withCredentials: true,
});

export const auth = axios.create({
  baseURL: selectAuthAPI(),
  withCredentials: true,
});
