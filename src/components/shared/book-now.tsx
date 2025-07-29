'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { LuCalendar } from 'react-icons/lu';
import { BookModal } from './book-modal';

interface Props {
  className?: string;
}

export const BookNow: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const shouldOpen = searchParams.get('bookMassage') === 'true' || window.location.pathname === '/book';
    setIsOpen(shouldOpen);
  }, [searchParams]);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('bookMassage');
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className={cn('flex justify-center items-center border-t border-b h-[120px] my-8 mx-4', className)}>
      <Button
        onClick={() => {
          setIsOpen(true);
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set('bookMassage', 'true');
          router.replace(`?${newParams.toString()}`, { scroll: false });
        }}
        className="flex items-center justify-center gap-2 md:w-auto h-11 px-12 py-4 text-lg font-semibold text-white bg-secondary hover:bg-secondary/90 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
      >
        <LuCalendar />
        Онлайн запис
      </Button>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={handleClose}>
          <div onClick={(e) => e.stopPropagation()}>
            <BookModal onClose={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
};
