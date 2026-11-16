import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAdminBlogCategory,
  createAdminBlogPost,
  deleteAdminBlogCategory,
  deleteAdminBlogPost,
  getAdminBlogCategories,
  getAdminBlogPostBySlug,
  getAdminBlogPosts,
  updateAdminBlogCategory,
  updateAdminBlogPost,
} from '../api/blogAdminApi';
import {
  ICreateBlogCategoryInput,
  ICreateBlogPostInput,
  IUpdateBlogPostInput,
} from '../types/blogAdmin';

export const BLOG_POSTS_QUERY_KEY = ['admin-blog-posts'];
export const BLOG_CATEGORIES_QUERY_KEY = ['admin-blog-categories'];

export function useAdminBlogPosts() {
  return useQuery({
    queryKey: BLOG_POSTS_QUERY_KEY,
    queryFn: getAdminBlogPosts,
    staleTime: 1000 * 60 * 2,
  });
}

export function useAdminBlogPost(slug: string) {
  return useQuery({
    queryKey: ['admin-blog-post', slug],
    queryFn: () => getAdminBlogPostBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateAdminBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ICreateBlogPostInput) => createAdminBlogPost(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_POSTS_QUERY_KEY });
    },
  });
}

export function useUpdateAdminBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: IUpdateBlogPostInput) => updateAdminBlogPost(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_POSTS_QUERY_KEY });
    },
  });
}

export function useDeleteAdminBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idOrSlug: string) => deleteAdminBlogPost(idOrSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_POSTS_QUERY_KEY });
    },
  });
}

export function useAdminBlogCategories() {
  return useQuery({
    queryKey: BLOG_CATEGORIES_QUERY_KEY,
    queryFn: getAdminBlogCategories,
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateAdminBlogCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ICreateBlogCategoryInput) =>
      createAdminBlogCategory(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_CATEGORIES_QUERY_KEY });
    },
  });
}

export function useUpdateAdminBlogCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, descricao }: { id: string; descricao: string }) =>
      updateAdminBlogCategory(id, descricao),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_CATEGORIES_QUERY_KEY });
    },
  });
}

export function useDeleteAdminBlogCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idOrSlug: string) => deleteAdminBlogCategory(idOrSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_CATEGORIES_QUERY_KEY });
    },
  });
}
