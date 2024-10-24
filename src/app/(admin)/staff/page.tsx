'use client';

import { TableStaff } from '@/components/table/TableStaff';
import { useModal } from '@/contexts/ModalContext';

export default function Staff() {
  const { ModalContent, openModal } = useModal();
  return (
    <div className="flex flex-row px-4">
      <TableStaff withModal={openModal} />
      <div>
        <ModalContent title="Staff" side>
          <div className="h-96">alou to</div>
        </ModalContent>
      </div>
    </div>
  );
}
