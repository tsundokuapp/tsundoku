import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { ApiResponse, ErrorResponse, INovelResponse } from '@/@types/Api';
import { api } from '@/services/api';

const getAdminNovels = async (): Promise<INovelResponse[]> => {
  try {
    const response = await api.get('/admin/obra/novels?take=12');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useAdminNovels = (): UseQueryResult<
  ApiResponse<INovelResponse>
> => {
  return useQuery({
    queryKey: ['adm-novels'],
    queryFn: getAdminNovels,
  });
};

export const createNovel = async (
  data: FormData,
): Promise<INovelResponse | ErrorResponse> => {
  try {
    const response: AxiosResponse<INovelResponse> = await api.post(
      '/admin/obra/novel',
      data,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data,
        statusCode: error.response.status,
      };
    }
    return {
      message: {
        errors: {},
        status: 500,
        title: 'Erro desconhecido',
      },
      statusCode: 500,
    };
  }
};
