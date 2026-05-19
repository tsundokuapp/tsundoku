import { auth } from '@/core/api';
import { ApiResponse } from '@/core/api/types';
import { handleApiError } from '@/core/api/util';

import {
  IUserLoginData,
  IUserLoginResponse,
  IUserRegisterData,
  IUserRegisterResponse,
} from './types';

export const createUserService = async (
  dataRequest: IUserRegisterData,
): Promise<ApiResponse<IUserRegisterResponse>> => {
  try {
    const { data } = await auth.post('/auth/cadastro', dataRequest);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const loginUserService = async (
  dataRequest: IUserLoginData,
): Promise<ApiResponse<IUserLoginResponse>> => {
  try {
    const { data } = await auth.post('/auth/login', dataRequest);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};
