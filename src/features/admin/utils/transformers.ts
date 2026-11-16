import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import {
  type InputFormCreateProject,
  type InputFormUnifiedVolumeAndChapter,
} from '../schemas';

export function transformFormDataNovel(data: InputFormCreateProject) {
  const currentUsername = useAuthStore.getState().username || 'admin';
  return {
    titulo: data.title,
    tituloAlternativo: data.titleAlternative,
    autor: data.author,
    alias: data.aliasTitle,
    artista: data.illustration,
    ano: data.yearRelease,
    ehObraMaiorIdade: data.isAdult === 'sim',
    ehRecomendacao: data.isRecommendation === 'sim',
    codigoCorHexaObra: data.hexColor,
    tipoObra: data.type,
    // cargoObraDiscord: data.discordRole,
    statusObra: data.status,
    nacionalidade: data.nationality,
    listaGeneros: data.genres,
    sinopse: data.synopsis,
    imagemCapaPrincipalFile: data.cover,
    usuarioAlteracao: currentUsername,
    usuarioInclusao: currentUsername,
    dataAlteracao: new Date().toISOString(),
    publicado: data.privacy === 'publico',
    ...Object.fromEntries(
      Object.entries(data).filter(
        ([key]) =>
          ![
            'title',
            'titleAlternative',
            'author',
            'yearRelease',
            'hexColor',
            'type',
            'status',
            'nationality',
            'synopsis',
            'cover',
            'genres',
            'aliasTitle',
          ].includes(key),
      ),
    ),
  };
}

export function transformFormDataComic(data: InputFormCreateProject) {
  const currentUsername = useAuthStore.getState().username || 'admin';
  return {
    titulo: data.title,
    tituloAlternativo: data.titleAlternative,
    autor: data.author,
    alias: data.aliasTitle,
    artista: data.illustration,
    ano: data.yearRelease,
    ehObraMaiorIdade: data.isAdult === 'sim',
    ehRecomendacao: data.isRecommendation === 'sim',
    codigoCorHexaObra: data.hexColor,
    tipoObra: data.type,
    // cargoObraDiscord: data.discordRole,
    statusObra: data.status,
    nacionalidade: data.nationality,
    listaGeneros: data.genres,
    sinopse: data.synopsis,
    imagemCapaPrincipalFile: data.cover,
    usuarioInclusao: currentUsername,
    usuarioAlteracao: currentUsername,
    dataAlteracao: new Date().toISOString(),
    publicado: data.privacy === 'publico',
    ...Object.fromEntries(
      Object.entries(data).filter(
        ([key]) =>
          ![
            'title',
            'titleAlternative',
            'author',
            'yearRelease',
            'hexColor',
            'type',
            'status',
            'nationality',
            'synopsis',
            'cover',
            'genres',
            'aliasTitle',
          ].includes(key),
      ),
    ),
  };
}

export function transformFormDataNovelVolumeAndChapter(
  data: InputFormUnifiedVolumeAndChapter,
) {
  const isVolume = data.type === 'volume';
  const currentUsername = useAuthStore.getState().username || 'admin';
  return {
    titulo: data.title,
    sinopse: isVolume ? data.description : undefined,
    ImagemVolumeFile: isVolume ? data.cover : undefined,
    numero: isVolume ? data.number : undefined,
    usuarioAlteracao: currentUsername,
    usuarioInclusao: currentUsername,
    dataAlteracao: new Date().toISOString(),
    ...Object.fromEntries(
      Object.entries(data).filter(
        ([key]) =>
          ![
            'title',
            'titleAlternative',
            'author',
            'yearRelease',
            'hexColor',
            'type',
            'status',
            'nationality',
            'synopsis',
            'cover',
            'genres',
            'aliasTitle',
          ].includes(key),
      ),
    ),
  };
}
