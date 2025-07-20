import React from 'react';
import { cn } from '@/lib/utils';
import { AppointmentSlot } from '@prisma/client';
import { AdminAppointmentCard } from './admin-appointment-card';

interface Props {
  className?: string;
  slots: AppointmentSlot[];
}

export const AppointmentList: React.FC<Props> = ({ className, slots }) => {
  return (
    <ul className={cn('flex flex-col gap-2', className)}>
      {slots.map((slot) => (
        <AdminAppointmentCard key={slot.id} slot={slot} />
      ))}
    </ul>
  );
};
