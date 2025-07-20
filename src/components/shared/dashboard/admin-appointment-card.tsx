import React from 'react';
import { cn } from '@/lib/utils';
import { AppointmentSlot } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
  className?: string;
  slot: AppointmentSlot;
}

export const AdminAppointmentCard: React.FC<Props> = ({ className, slot }) => {
  return (
    <li className={cn('flex w-full gap-4 border-2 border-[#4a4a55] rounded-xl bg-[#1d1f26] p-4', className)}>
      <span>Зарезервовано: {slot.reserved ? 'Так' : 'Ні'}</span>
      <span>{format(new Date(slot.time), 'yyyy-MM-dd HH:mm')}</span>
    </li>
  );
};
