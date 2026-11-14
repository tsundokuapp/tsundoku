'use client';

import { PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr';

import { IAdminBlogCategory } from '../types/blogAdmin';

interface BlogCategoryTableProps {
  categories: IAdminBlogCategory[];
  onEdit?: (category: IAdminBlogCategory) => void;
  onDelete?: (category: IAdminBlogCategory) => void;
}

export const BlogCategoryTable = ({
  categories,
  onEdit,
  onDelete,
}: BlogCategoryTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#2e2e38] bg-[#121214]">
      <table className="w-full text-left text-sm text-gray-200">
        <thead className="border-b border-[#2e2e38] bg-[#202024] text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold">
              Categorias
            </th>
            <th scope="col" className="px-4 py-4 font-semibold">
              Autor Cadastro
            </th>
            <th scope="col" className="px-4 py-4 font-semibold">
              Data Cadastro
            </th>
            <th scope="col" className="px-6 py-4 text-right font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#202024]">
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-8 text-center text-gray-400">
                Nenhuma categoria encontrada.
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr
                key={cat.id}
                className="h-[60px] bg-[#18181b]/60 transition-colors hover:bg-[#202024]"
                data-testid={`blog-category-row-${cat.slug}`}
              >
                <td className="px-6 py-3 font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-[#259cc1]">•</span>
                    <span>{cat.descricao}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300">{cat.author}</td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {cat.createdAt}
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(cat)}
                        title="Editar Categoria"
                        className="flex h-8 w-8 items-center justify-center rounded bg-[#202024] text-gray-300 transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
                      >
                        <PencilSimple size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(cat)}
                        title="Excluir Categoria"
                        className="flex h-8 w-8 items-center justify-center rounded bg-[#202024] text-gray-300 transition-colors hover:bg-red-600 hover:text-white"
                      >
                        <Trash size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
