import { isDevEnvironment } from '@/features/admin/utils/devMock';

import {
  IAdminBlogCategory,
  IAdminBlogPost,
  ICreateBlogCategoryInput,
  ICreateBlogPostInput,
  IUpdateBlogPostInput,
} from '../types/blogAdmin';
import {
  addDevCategory,
  addDevPost,
  deleteDevCategory,
  deleteDevPost,
  getDevCategories,
  getDevPostBySlug,
  getDevPosts,
  updateDevCategory,
  updateDevPost,
} from '../utils/blogDevMock';

// ============================================================================
// REQUIREMENT R3 & BACKEND INTEGRATION NOTICES
// ============================================================================
// TODO(backend-integration): Endpoints de gerenciamento de posts do blog:
//   - GET /api/admin/blog/posts (Listar posts)
//   - GET /api/admin/blog/posts/{idOrSlug} (Obter post)
//   - POST /api/admin/blog/posts (Criar post)
//   - PUT /api/admin/blog/posts/{id} (Atualizar post)
//   - DELETE /api/admin/blog/posts/{id} (Excluir post)
// Dependência exata: O backend `tsundoku-api` (C# .NET 8) não possui entidade Blog,
// controlador BlogController, nem tabelas de posts no banco de dados PostgreSQL.
// Comportamento: Em desenvolvimento (`isDevEnvironment()`), as operações utilizam
// o store simulado em memória `blogDevMock.ts`. Em produção, retornam coleções vazias
// e sinalizam indisponibilidade.
// ============================================================================

export interface IBlogListResult<T> {
  data: T[];
  isUnavailable: boolean;
  unavailableReason?: string;
}

export async function getAdminBlogPosts(): Promise<
  IBlogListResult<IAdminBlogPost>
> {
  if (!isDevEnvironment()) {
    return {
      data: [],
      isUnavailable: true,
      unavailableReason:
        'O serviço de artigos do Blog ainda não possui integração disponível no servidor de produção.',
    };
  }

  return {
    data: getDevPosts(),
    isUnavailable: false,
  };
}

export async function getAdminBlogPostBySlug(
  slug: string,
): Promise<{ post: IAdminBlogPost | null; isUnavailable: boolean }> {
  if (!isDevEnvironment()) {
    return { post: null, isUnavailable: true };
  }

  const post = getDevPostBySlug(slug);
  return { post: post || null, isUnavailable: false };
}

export async function createAdminBlogPost(
  input: ICreateBlogPostInput,
  author = 'Admin',
): Promise<{ success: boolean; post?: IAdminBlogPost; message?: string }> {
  if (!isDevEnvironment()) {
    return {
      success: false,
      message:
        'Criação de artigos indisponível no ambiente de produção (dependência de backend pendente).',
    };
  }

  const post = addDevPost(input, author);
  return { success: true, post };
}

export async function updateAdminBlogPost(
  input: IUpdateBlogPostInput,
): Promise<{ success: boolean; post?: IAdminBlogPost; message?: string }> {
  if (!isDevEnvironment()) {
    return {
      success: false,
      message:
        'Edição de artigos indisponível no ambiente de produção (dependência de backend pendente).',
    };
  }

  const post = updateDevPost(input);
  return { success: true, post };
}

export async function deleteAdminBlogPost(
  idOrSlug: string,
): Promise<{ success: boolean; message?: string }> {
  if (!isDevEnvironment()) {
    return {
      success: false,
      message:
        'Exclusão de artigos indisponível no ambiente de produção (dependência de backend pendente).',
    };
  }

  const deleted = deleteDevPost(idOrSlug);
  return {
    success: deleted,
    message: deleted
      ? 'Post excluído com sucesso.'
      : 'Post não encontrado para exclusão.',
  };
}

// ============================================================================
// TODO(backend-integration): Endpoints de gerenciamento de categorias do blog:
//   - GET /api/admin/blog/categorias (Listar categorias)
//   - POST /api/admin/blog/categorias (Criar categoria)
//   - PUT /api/admin/blog/categorias/{id} (Atualizar categoria)
//   - DELETE /api/admin/blog/categorias/{id} (Excluir categoria)
// Dependência exata: O backend `tsundoku-api` possui apenas categorias/gêneros de
// Obras (/api/genero), não de Blog.
// ============================================================================

export async function getAdminBlogCategories(): Promise<
  IBlogListResult<IAdminBlogCategory>
> {
  if (!isDevEnvironment()) {
    return {
      data: [],
      isUnavailable: true,
      unavailableReason:
        'O serviço de categorias do Blog ainda não possui integração disponível no servidor de produção.',
    };
  }

  return {
    data: getDevCategories(),
    isUnavailable: false,
  };
}

export async function createAdminBlogCategory(
  input: ICreateBlogCategoryInput,
  author = 'Admin',
): Promise<{
  success: boolean;
  category?: IAdminBlogCategory;
  message?: string;
}> {
  if (!isDevEnvironment()) {
    return {
      success: false,
      message:
        'Criação de categoria indisponível no ambiente de produção (dependência de backend pendente).',
    };
  }

  try {
    const category = addDevCategory(input, author);
    return { success: true, category };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message || 'Erro ao criar categoria.',
    };
  }
}

export async function updateAdminBlogCategory(
  id: string,
  descricao: string,
): Promise<{
  success: boolean;
  category?: IAdminBlogCategory;
  message?: string;
}> {
  if (!isDevEnvironment()) {
    return {
      success: false,
      message:
        'Atualização de categoria indisponível no ambiente de produção (dependência de backend pendente).',
    };
  }

  try {
    const category = updateDevCategory(id, descricao);
    return { success: true, category };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message || 'Erro ao atualizar categoria.',
    };
  }
}

export async function deleteAdminBlogCategory(
  idOrSlug: string,
): Promise<{ success: boolean; message?: string }> {
  if (!isDevEnvironment()) {
    return {
      success: false,
      message:
        'Exclusão de categoria indisponível no ambiente de produção (dependência de backend pendente).',
    };
  }

  const deleted = deleteDevCategory(idOrSlug);
  return {
    success: deleted,
    message: deleted
      ? 'Categoria excluída com sucesso.'
      : 'Categoria não encontrada.',
  };
}
