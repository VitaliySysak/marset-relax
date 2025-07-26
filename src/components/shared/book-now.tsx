'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { LuCalendar } from 'react-icons/lu';
import { BookModal } from './book-modal';

interface Props {
  className?: string;
}

export const BookNow: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={cn('flex justify-center items-center bg-primary h-[200px] rounded-2xl mt-4', className)}>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center gap-2 w-full md:w-auto h-11 px-12 py-4 text-lg font-semibold text-white bg-secondary hover:bg-secondary/90 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
      >
        <LuCalendar />
        Онлайн запис
      </Button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <BookModal onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
