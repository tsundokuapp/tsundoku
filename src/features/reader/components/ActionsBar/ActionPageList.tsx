import { type ComponentProps } from 'react';

import { ScrollMode } from '@/features/reader/types/ScrollMode';
import { GenerateDoublePageList } from '@/features/reader/utils/pageList/GenerateDoublePageList';
import { GenerateSinglePageList } from '@/features/reader/utils/pageList/GenerateSinglePageList';
import { GetPageLabelOnDoubleList } from '@/features/reader/utils/pageList/GetPageLabelOnDoubleList';
import { GetPageLabelOnSingleList } from '@/features/reader/utils/pageList/GetPageLabelOnSingleList';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

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
