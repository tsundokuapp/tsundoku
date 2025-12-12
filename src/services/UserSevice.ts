import axios, { AxiosResponse } from 'axios';

import {
  ErrorResponse,
  IUserRegisterData,
  IUserRegisterResponse,
} from '@/@types/Api';

import { auth } from './api';

export const createUserService = async (
  data: IUserRegisterData,
): Promise<IUserRegisterResponse | ErrorResponse> => {
  try {
    const response: AxiosResponse<IUserRegisterResponse> = await auth.post(
      'cadastro',
      data,
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response?.data || error?.message,
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
