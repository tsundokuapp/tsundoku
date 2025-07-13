import { TStatusComic, TStatusNovel } from '@/@types/System';

export const MapStatusToColor = (status: TStatusNovel | TStatusComic) => {
  const statusNormalized = status.toLowerCase();
  switch (statusNormalized) {
    case 'em andamento':
      return 'bg-green-700';
    case 'hiato':
      return 'bg-yellow-700';
    case 'cancelado':
      return 'bg-red-700';
    case 'concluído':
      return 'bg-blue-700';
    default:
      return 'bg-gray-700';
  }
};
