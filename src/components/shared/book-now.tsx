'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { LuCalendar } from 'react-icons/lu';
import { BookModal } from './book-modal';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';

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
    <div className={cn('flex justify-center items-center border-t border-b h-[120px] mt-12 mx-4', className)}>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <Button
          onClick={() => {
            setIsOpen(true);
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set('bookMassage', 'true');
            router.replace(`?${newParams.toString()}`, { scroll: false });
          }}
          className="flex items-center justify-center gap-2 h-11 px-12 py-4 text-lg font-semibold text-white bg-secondary hover:bg-secondary/90 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          <LuCalendar />
          Онлайн запис
        </Button>
        <DialogContent
          className={cn(
            'p-6 w-full h-screen gap-0 md:h-[90vh] justify-between !max-w-[1200px] bg-primary flex flex-col rounded-none md:rounded-2xl shadow-2xl dark:[color-scheme:dark]',
            className,
          )}
        >
          <DialogTitle className="text-2xl font-bold text-[#d34545] mb-4">Зарезервуйте масаж</DialogTitle>
          <BookModal onClose={handleClose} />
          <DialogDescription />
        </DialogContent>
      </Dialog>
    </div>
  );
};
