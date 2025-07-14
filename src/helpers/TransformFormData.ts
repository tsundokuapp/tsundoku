import { InputFormCreateProject } from './Schemas';

export function transformFormDataNovel(data: InputFormCreateProject) {
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
    usuarioAlteracao: 'admin',
    usuarioInclusao: 'admin',
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
    usuarioInclusao: 'admin',
    usuarioAlteracao: 'admin',
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
