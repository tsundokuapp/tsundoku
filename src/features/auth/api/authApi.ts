import { auth } from '@/core/api';
import { handleApiError } from '@/core/api/util';
import {
  IUserLoginData,
  IUserLoginResponse,
  IUserRegisterData,
  IUserRegisterResponse,
} from './types';

export const createUserService = async (
  dataRequest: IUserRegisterData,
): Promise<ApiResult<IUserRegisterResponse>> => {
  try {
    const { data } = await auth.post('cadastro', dataRequest);
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
): Promise<ApiResult<IUserLoginResponse>> => {
  try {
    const { data } = await auth.post('login', dataRequest);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};
