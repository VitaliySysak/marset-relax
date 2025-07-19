import React from 'react';
import { cn } from '@/lib/utils';
import { AppointmentSlot } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
  className?: string;
  slots: AppointmentSlot[];
}

export const AppointmentList: React.FC<Props> = ({ className, slots }) => {
  return (
    <ul className={cn('', className)}>
      {slots.map(({ id, reserved, time }) => (
        <li key={id} className="flex">
          <span>reserved: {reserved ? 'Yes' : 'No'}</span>
          <span>{format(new Date(time), 'yyyy-MM-dd HH:mm')}</span>
        </li>
      ))}
    </ul>
  );
};
