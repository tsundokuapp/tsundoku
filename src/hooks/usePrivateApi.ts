// ----------------COMICS----------------

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  ApiResponse,
  ErrorResponse,
  IComicResponse,
  IPrivateComics,
} from '@/@types/Api';
import { createComicService, getPrivateComics } from '@/services/ComicService';

export const usePrivateComics = (): UseQueryResult<
  ApiResponse<IPrivateComics>
> => {
  return useQuery({
    queryKey: ['private-comics'],
    queryFn: getPrivateComics,
  });
};

export const createComic = async (
  data: FormData,
): Promise<IComicResponse | ErrorResponse> => {
  return createComicService(data);
};
