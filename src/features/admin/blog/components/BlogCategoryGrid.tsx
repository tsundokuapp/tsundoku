'use client';

import { PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr';

import { IAdminBlogCategory } from '../types/blogAdmin';

interface BlogCategoryGridProps {
  categories: IAdminBlogCategory[];
  activeCategory?: string;
  onSelectCategory?: (category: IAdminBlogCategory) => void;
  onEdit?: (category: IAdminBlogCategory) => void;
  onDelete?: (category: IAdminBlogCategory) => void;
}

export const BlogCategoryGrid = ({
  categories,
  activeCategory,
  onSelectCategory,
  onEdit,
  onDelete,
}: BlogCategoryGridProps) => {
  if (categories.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-gray-400">
        Nenhuma categoria cadastrada.
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap gap-2.5"
      data-testid="blog-category-chip-grid"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.descricao;

        return (
          <div
            key={cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat)}
            className={`group flex h-[34px] cursor-pointer items-center gap-2 rounded-md border px-3 text-sm font-medium transition-all ${
              isActive
                ? 'border-[#259cc1] bg-[#259cc1] text-[#121214]'
                : 'border-[#259cc1] bg-[#121214] text-[#259cc1] hover:bg-[#202024]'
            }`}
          >
            <span>{cat.descricao}</span>
            {cat.postCount !== undefined && (
              <span
                className={`py-0.2 rounded-full px-1.5 text-[10px] font-bold ${
                  isActive
                    ? 'bg-[#121214] text-[#259cc1]'
                    : 'bg-[#202024] text-gray-300'
                }`}
              >
                {cat.postCount}
              </span>
            )}

            {/* Quick Actions */}
            <div className="ml-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              {onEdit && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(cat);
                  }}
                  title="Editar Categoria"
                  className={`hover:text-white ${isActive ? 'text-[#121214]' : 'text-gray-400'}`}
                >
                  <PencilSimple size={14} />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(cat);
                  }}
                  title="Excluir Categoria"
                  className={`hover:text-red-400 ${isActive ? 'text-[#121214]' : 'text-gray-400'}`}
                >
                  <Trash size={14} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
