import {
  IProjectRecomendations,
  IProjectsHome,
  IPublicGenres,
  IWork,
} from '@/@types/Api';

import { api } from './api';

export const getProjects = async (): Promise<IProjectsHome[]> => {
  try {
    const response = await api.get('/obras/home');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRecomendations = async (): Promise<
  IProjectRecomendations[]
> => {
  try {
    const response = await api.get('/obras/recomendadas');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getGenres = async (): Promise<IPublicGenres[]> => {
  try {
    const response = await api.get('/generos');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getWorksBySearch = async (searchTerm: string): Promise<IWork> => {
  try {
    const response = await api.get(
      `/obras/pesquisa?obra=${encodeURIComponent(searchTerm)}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IWork;
  }
};
