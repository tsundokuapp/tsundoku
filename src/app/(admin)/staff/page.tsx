'use client';

import { Avatar } from '@/components/common/Avatar';
import { FormEditStaff } from '@/components/common/form/FormEditStaff';
import { TableStaff } from '@/components/dashboard/table';
import { useModal } from '@/contexts/ModalContext';
import { StaffMembers } from '@/helpers/Util';

export default function Staff() {
  const { Modal, openModal } = useModal();

  return (
    <div className="flex flex-row">
      <TableStaff withModal={openModal} />
      <div>
        <Modal title="Edição de Staff">
          <main className="mx-4 flex flex-row items-center justify-between gap-4 px-4">
            <aside className="flex flex-col items-center justify-center gap-4 border-r-[1px] px-2">
              <Avatar
                src={StaffMembers[1].avatar}
                name={StaffMembers[0].name}
                description={StaffMembers[0].inHouse}
                size={120}
                className="h-32 w-32 ring-4"
              />

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
