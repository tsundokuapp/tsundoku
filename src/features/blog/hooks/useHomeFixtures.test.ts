import { renderHook } from '@testing-library/react';

import { useHomeRanking } from '@/features/ranking/hooks/useHomeRanking';

import { useHomeBlogPosts } from './useHomeBlogPosts';

describe('Fixtures dev-only de Blog e Ranking', () => {
  it('retorna fixtures tipadas em ambiente não-produtivo', () => {
    const { result: blogResult } = renderHook(() => useHomeBlogPosts(3, true));
    expect(blogResult.current.isFixture).toBe(true);
    expect(blogResult.current.posts).toHaveLength(3);

    const { result: rankingResult } = renderHook(() => useHomeRanking(8, true));
    expect(rankingResult.current.isFixture).toBe(true);
    expect(rankingResult.current.entries).toHaveLength(8);
  });

  it('bloqueia fixtures em produção e retorna estado indisponível explícito', () => {
    const { result: blogResult } = renderHook(() => useHomeBlogPosts(3, false));
    expect(blogResult.current.isFixture).toBe(false);
    expect(blogResult.current.posts).toHaveLength(0);
    expect(blogResult.current.unavailableReason).toBeTruthy();

    const { result: rankingResult } = renderHook(() =>
      useHomeRanking(8, false),
    );
    expect(rankingResult.current.isFixture).toBe(false);
    expect(rankingResult.current.entries).toHaveLength(0);
    expect(rankingResult.current.unavailableReason).toBeTruthy();
  });
});
