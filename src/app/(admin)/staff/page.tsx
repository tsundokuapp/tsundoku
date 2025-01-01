'use client';

import { FormEditStaff } from '@/components/admin/form/FormEditStaff';
import { Avatar } from '@/components/common/Avatar';
import { TableStaff } from '@/components/dashboard/table';
import { useModal } from '@/contexts/ModalContext';
import { StaffMembers } from '@/helpers/Util';

export default function Staff() {
  const { Modal, openModal } = useModal();

  return (
    <div className="flex flex-row px-4">
      <TableStaff withModal={openModal} />
      <div>
        <Modal title="Edição de Staff">
          <main className="mx-4 flex flex-row items-center justify-between gap-4 px-4">
            <aside className="flex flex-col items-center justify-center gap-4 border-r-[1px] px-2">
              <Avatar
                src={StaffMembers[1].avatar}
                name={StaffMembers[0].name}
                inHouse={StaffMembers[0].inHouse}
                size={120}
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
