import { useMemo } from 'react';

import { HOME_RANKING_DEV_FIXTURES } from '../mocks/homeRankingMock';
import { IRankingEntry } from '../types';

export interface UseHomeRankingResult {
  entries: IRankingEntry[];
  isLoading: boolean;
  isError: boolean;
  isFixture: boolean;
  unavailableReason?: string;
}

// TODO(backend-integration): Conectar ranking de apoiadores/leitores a endpoint real.
// Dependência exata: endpoint público no `tsundoku-api` ou `Torii` (ex.: `GET /api/ranking/apoiadores?limit=8`), atualmente inexistente.
// Comportamento temporário: em desenvolvimento (`NODE_ENV !== 'production'`) utiliza `HOME_RANKING_DEV_FIXTURES`; em produção retorna vazio e exibe estado indisponível.
// Dados/operações necessárias: listagem ordenada por pontuação/nível com `id`, `position`, `displayName`, `badgeLabel` e `avatarUrl`.
export function useHomeRanking(
  limit = 8,
  allowDevFixtures = process.env.NODE_ENV !== 'production',
): UseHomeRankingResult {
  return useMemo(() => {
    if (!allowDevFixtures) {
      return {
        entries: [],
        isLoading: false,
        isError: false,
        isFixture: false,
        unavailableReason:
          'Ranking da comunidade indisponível até integração com a API de apoiadores.',
      };
    }

    return {
      entries: HOME_RANKING_DEV_FIXTURES.slice(0, limit),
      isLoading: false,
      isError: false,
      isFixture: true,
    };
  }, [allowDevFixtures, limit]);
}
