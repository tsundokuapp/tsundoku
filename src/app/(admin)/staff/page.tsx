'use client';

import { StaffMembers } from '@/features/admin/__mocks__/staffMembers';
import { TableStaff } from '@/features/admin/components/dashboard/table';
import { Modal } from '@/shared/components/feedback/Modal';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { FormEditStaff } from '@/shared/components/ui/form/FormEditStaff';
import { useModal } from '@/shared/contexts/ModalContext';

export default function Staff() {
  const { openModal } = useModal();

  return (
    <div className="flex flex-row">
      <TableStaff withModal={openModal} />
      <div>
        <Modal title="Edição de Staff">
          <main className="mx-4 flex flex-row items-center justify-between gap-4 px-4">
            <aside className="flex flex-col items-center justify-center gap-4 border-r-[1px] px-2">
              <Avatar className="h-32 w-32 ring-4">
                <AvatarImage src={StaffMembers[1].avatar} />
                <AvatarFallback>{StaffMembers[0].name}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col justify-center text-center">
                <span className="text-xs">
                  {<strong>Entrada em:</strong>} 28/09/2020
                </span>
                <span className="text-xs">
                  {<strong>Último login em:</strong>} 28/09/2020
                </span>
              </div>
            </aside>
            <aside>
              <FormEditStaff />
            </aside>
          </main>
        </Modal>
      </div>
    </div>
  );
}
