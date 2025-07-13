import { InputFormCreateProject } from './Schemas';

export function transformFormDataNovel(data: InputFormCreateProject) {
  return {
    titulo: data.title,
    tituloAlternativo: data.titleAlternative,
    autor: data.author,
    alias: data.aliasTitle,
    // artista: data.illustration,
    ano: data.yearRelease,
    // ehObraMaiorIdade: data.isAdult,
    // ehRecomendacao: data.isRecommendation,
    codigoCorHexaObra: data.hexColor,
    tipoObraSlug: data.type,
    // cargoObraDiscord: data.discordRole,
    statusObraSlug: data.status,
    nacionalidadeSlug: data.nationality,
    listaGeneros: data.genres,
    sinopse: data.synopsis,
    imagemCapaPrincipalFile: data.cover,
    usuarioInclusao: 'admin',
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
  return {
    titulo: data.title,
    tituloAlternativo: data.titleAlternative,
    autor: data.author,
    alias: data.aliasTitle,
    // artista: data.illustration,
    ano: data.yearRelease,
    // ehObraMaiorIdade: data.isAdult,
    // ehRecomendacao: data.isRecommendation,
    codigoCorHexaObra: data.hexColor,
    tipoObraSlug: data.type,
    // cargoObraDiscord: data.discordRole,
    statusObraSlug: data.status,
    nacionalidadeSlug: data.nationality,
    listaGeneros: data.genres,
    sinopse: data.synopsis,
    imagemCapaPrincipalFile: data.cover,
    usuarioInclusao: 'admin',
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
