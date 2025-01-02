'use client';

import { TableManga } from '@/components/dashboard/table';
import { useModal } from '@/contexts/ModalContext';

export default function NovelAdmin() {
  const { Modal } = useModal();
  return (
    <div className="flex flex-row px-4">
      <TableManga />
      <div>
        <Modal title="Staff" side>
          <div>alou to</div>
        </Modal>
      </div>
    </div>
  );
}
