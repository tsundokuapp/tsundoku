import { type ComponentProps } from 'react';

import type { ScrollMode } from '@/@types/ScrollMode';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { GenerateDoublePageList } from '@/helpers/pageList/GenerateDoublePageList';
import { GenerateSinglePageList } from '@/helpers/pageList/GenerateSinglePageList';
import { GetPageLabelOnDoubleList } from '@/helpers/pageList/GetPageLabelOnDoubleList';
import { GetPageLabelOnSingleList } from '@/helpers/pageList/GetPageLabelOnSingleList';

interface ActionPageListProps extends ComponentProps<'div'> {
  scrollMode: ScrollMode;
  totalPages: number;
  showPage: number;
  onPageChange: (setPage: number) => void;
}

export function ActionPageList({
  scrollMode,
  totalPages,
  showPage,
  onPageChange,
}: ActionPageListProps) {
  // Estou pensando se devemos separar isto em dois componentes...
  // ActionSinglePageList e ActionDoublePageList.

  const dropdownLabel = `${totalPages} Páginas`;

  const dropdownValue =
    scrollMode === 'double'
      ? GetPageLabelOnDoubleList({ showPage, totalPages })
      : GetPageLabelOnSingleList({ showPage, totalPages });

  const pageList =
    scrollMode === 'double'
      ? GenerateDoublePageList({ totalPages })
      : GenerateSinglePageList({ totalPages });

  const handlePageChange = (pageNumber: number) => {
    showPage = pageNumber;
    onPageChange(pageNumber);
  };

  return (
    <DropdownContainer label={dropdownLabel} value={dropdownValue}>
      {pageList.map(({ pageListItemIndex, pageListItemLabel }) => {
        return (
          <DropdownOption
            key={pageListItemIndex}
            label={pageListItemLabel}
            value={pageListItemIndex.toString()}
            action={() => handlePageChange(pageListItemIndex)}
            selected={showPage === pageListItemIndex}
          />
        );
      })}
    </DropdownContainer>
  );
}
