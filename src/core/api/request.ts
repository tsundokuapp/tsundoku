export const selectAuthAPI = () => {
  if (process.env.NEXT_PUBLIC_IS_PRODUCTION_TORII === 'true') {
    return process.env.NEXT_PUBLIC_PROD_URL_API_TORII;
  }

  if (process.env.NEXT_PUBLIC_TORII_DOCKER_UP === 'true') {
    return process.env.NEXT_PUBLIC_TORII_URL_DOCKER;
  }

  return process.env.NEXT_PUBLIC_TORII_URL;
};

export const selectAPI = () => {
  if (process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true') {
    return process.env.NEXT_PUBLIC_PROD_URL_API;
  }

  if (process.env.NEXT_PUBLIC_DOCKER_UP === 'true') {
    return process.env.NEXT_PUBLIC_API_URL_DOCKER;
  }

  return process.env.NEXT_PUBLIC_API_URL;
};
