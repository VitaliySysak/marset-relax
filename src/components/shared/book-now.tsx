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
        className="w-full bg-secondary flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 md:w-auto mx-auto hover:bg-secondary/90 text-primary-foreground px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
