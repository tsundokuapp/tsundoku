import axios from 'axios';

import { ApiError } from './types';

function isApiErrorMessage(data: unknown): data is ApiError['message'] {
  return (
    typeof data === 'object' &&
    data !== null &&
    'errors' in data &&
    'status' in data &&
    'title' in data
  );
}

export function handleApiError(error: unknown): ApiError {
  // Erro do Axios (requisição foi feita)
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500;
    const data = error.response?.data;

    if (isApiErrorMessage(data)) {
      return {
        message: data,
        statusCode: status,
      };
    }

    // API retornou string ou formato diferente
    if (typeof data === 'string') {
      return {
        message: {
          errors: {},
          status,
          title: data,
        },
        statusCode: status,
      };
    }

    // Erro de rede (sem response)
    if (error.code === 'ERR_NETWORK') {
      return {
        message: {
          errors: {},
          status: 0,
          title: 'Erro de conexão. Verifique sua internet.',
        },
        statusCode: 0,
      };
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
      return {
        message: {
          errors: {},
          status: 408,
          title: 'A requisição demorou muito. Tente novamente.',
        },
        statusCode: 408,
      };
    }

    // Outros erros Axios
    return {
      message: {
        errors: {},
        status,
        title: error.message || 'Erro ao processar requisição',
      },
      statusCode: status,
    };
  }

  // Erro genérico do JavaScript
  if (error instanceof Error) {
    return {
      message: {
        errors: {},
        status: 500,
        title: error.message,
      },
      statusCode: 500,
    };
  }

  // Fallback para erros desconhecidos
  return {
    message: {
      errors: {},
      status: 500,
      title: 'Erro inesperado',
    },
    statusCode: 500,
  };
}

// if (!result.ok) {
//   // result.error.message.title -> mensagem amigável para o usuário
//   // result.error.message.errors -> erros de validação por campo
//   // result.error.statusCode -> para lógica condicional (401, 404, etc)
//   toaster({ type: 'error', msg: result.error.message.title });
//   return;
// }
