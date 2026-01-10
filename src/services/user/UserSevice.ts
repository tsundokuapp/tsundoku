import axios, { AxiosResponse } from 'axios';

import { ErrorResponse } from '@/@types/api/Error';
import {
  IUserLoginData,
  IUserLoginResponse,
  IUserRegisterData,
  IUserRegisterResponse,
} from '@/@types/domain/user/auth';

import { auth } from '../api/api';

export type LoginResult =
  | { ok: true; data: IUserLoginResponse }
  | { ok: false; error: ErrorResponse };

export type RegisterResult =
  | { ok: true; data: IUserRegisterResponse }
  | { ok: false; error: ErrorResponse };

export const createUserService = async (
  data: IUserRegisterData,
): Promise<RegisterResult> => {
  try {
    const response: AxiosResponse<IUserRegisterResponse> = await auth.post(
      'cadastro',
      data,
    );

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        ok: false,
        error: {
          message: error.response.data,
          statusCode: error.response.status,
        },
      };
    }

    return {
      ok: false,
      error: {
        message: {
          errors: {},
          status: 500,
          title: 'Erro desconhecido',
        },
        statusCode: 500,
      },
    };
  }
};

export const loginUserService = async (
  data: IUserLoginData,
): Promise<LoginResult> => {
  try {
    const response: AxiosResponse<IUserLoginResponse> = await auth.post(
      'login',
      data,
    );

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        ok: false,
        error: {
          message: error.response.data,
          statusCode: error.response.status,
        },
      };
    }

    return {
      ok: false,
      error: {
        message: {
          errors: {},
          status: 500,
          title: 'Erro desconhecido',
        },
        statusCode: 500,
      },
    };
  }
};
