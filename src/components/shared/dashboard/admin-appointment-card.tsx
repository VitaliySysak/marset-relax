import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import deleteSlot from '@/services/delete-appointment';
import { AppointmentSlotWithClient } from '@/services/get-admin-slots';

interface Props {
  className?: string;
  slot: AppointmentSlotWithClient;
  onSlotDeleted: () => void;
}

export const AdminAppointmentCard: React.FC<Props> = ({ className, slot, onSlotDeleted }) => {
  return (
    <li
      className={cn(
        'flex justify-between items-center w-full gap-4 border-2 border-[#4a4a55] rounded-xl bg-[#1d1f26] p-4',
        className,
      )}
    >
      <div>
        <h3>
          Зарезервовано:{' '}
          {slot.reserved ? (
            <span className="bg-[#16a249] p-2 rounded-2xl">Так</span>
          ) : (
            <span className="bg-[#b62628] p-2 rounded-2xl">Ні</span>
          )}
        </h3>
        <span>{format(new Date(slot.time), 'yyyy-MM-dd HH:mm')}</span>
      </div>
      <div>
        <p>{slot.client?.fullName}</p>
        <p>{slot.client?.phone}</p>
      </div>
      <Button
        onClick={async () => {
          await deleteSlot(slot.id);
          onSlotDeleted();
        }}
      >
        X
      </Button>
    </li>
  );
};
