'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSlotSchema, TBookSlotSchema } from '@/schemas/book-slot-schema';
import { ErrorText } from '../ui/error-text';
import bookSlot from '@/services/book-slot';
import { BookCalendar } from './book-calendar';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { ChooseMassage } from './choose-massage';
import { AppointmentInput } from '../ui/appointment-input';
import { cn } from '@/lib/utils';
import { FiUser } from 'react-icons/fi';

interface Props {
  className?: string;
  onClose: () => void;
}

export const BookModal: React.FC<Props> = ({ className, onClose }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TBookSlotSchema>({
    resolver: zodResolver(bookSlotSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      time: '',
      massageType: '',
      slotId: '',
    },
  });

  const onSubmit = async (data: TBookSlotSchema) => {
    try {
      setIsLoading(true);
      await bookSlot(data);
      form.reset();
      toast.success('надіслано успішно!');
    } catch (error) {
      console.error('Error while execution contact/onSubmit:', error);
      toast.error('сталася помилка при відправленні, спробуйте пізніше', { icon: '❌' });
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'fixed w-full h-screen overflow-y-auto dark:[color-scheme:dark] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary lg:w-[1000px] xl:w-[1200px] md:h-[80vh] md:rounded-2xl p-4 shadow-2xl z-100',
        className,
      )}
    >
      <FormProvider {...form}>
        <div className="flex justify-end">
          <IoClose onClick={onClose} className="cursor-pointer " color="#adadb1" />
        </div>
        <h1 className="text-[28px] font-extrabold text-[#d34545] text-left">Зарезервуйте масаж</h1>
        <form
          className="relative flex flex-col items-center gap-8 2xl:gap-16 mt-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ChooseMassage />
          {form.formState.errors.massageType?.message && (
            <ErrorText errorText={form.formState.errors.massageType.message} />
          )}
          <BookCalendar date={date} setDate={setDate} />
          {form.formState.errors.time?.message && <ErrorText errorText={form.formState.errors.time.message} />}
          <div className='w-full flex flex-col gap-4'>
            <div className="flex items-center w-full gap-2">
              <FiUser color="#d34545" />
              <label className="text-[20px] font-medium">Ваші данні</label>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full gap-4">
              <AppointmentInput className="flex-1" name="fullName" placeholder="Ім’я" autoComplete="name" />
              <AppointmentInput
                className="flex-1"
                name="phone"
                placeholder="Номер телефону"
                type="phone"
                autoComplete="tel"
              />
            </div>
            <AppointmentInput className="w-full" name="email" placeholder="Пошта" autoComplete="email" />
          </div>

          <Button
            loading={isLoading}
            className="w-full text-[18px] font-semibold bg-[#d34545] hover:bg-[#c14142] h-12 rounded-md"
          >
            Confirm Booking
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
