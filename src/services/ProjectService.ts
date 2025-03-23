import { IProjectRecomendations, IProjectsHome } from '@/@types/Api';

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
