'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorText } from '../ui/error-text';
import bookSlot from '@/services/book-slot';
import { BookCalendar } from './book-calendar';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { ChooseMassage } from './choose-massage';
import { AppointmentInput } from '../ui/appointment-input';
import { cn } from '@/lib/utils';
import { FiUser } from 'react-icons/fi';
import { bookSlotSchema, TBookSlotSchema } from '@/schemas/book-slot-schema';

interface Props {
  className?: string;
  onClose: () => void;
}

export const BookModal: React.FC<Props> = ({ className, onClose }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const nextStep = async () => {
    const valid = await form.trigger(['massageType']);
    if (valid) setStep((prev) => prev + 1);
  };

  const prevStep = async () => {
    const valid = await form.trigger(['massageType']);
    if (valid) setStep((prev) => prev - 1);
  };

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
        <div className="flex justify-between items-center">
          <h1 className="text-[28px] font-extrabold text-[#d34545] text-left">Зарезервуйте масаж</h1>
          <IoClose onClick={onClose} className="cursor-pointer " color="#adadb1" />
        </div>

        <form className="flex flex-col relative items-center" onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className="flex flex-col justify-between h-full">
              <ChooseMassage />
              {form.formState.errors.massageType?.message && (
                <ErrorText errorText={form.formState.errors.massageType.message} />
              )}
              <div className="w-full flex justify-end">
                <Button
                  type="button"
                  className="text-white bg-[#d34545] hover:bg-[#c14142]"
                  onClick={nextStep}
                  disabled={!form.watch('massageType')}
                >
                  Далі
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <BookCalendar date={date} setDate={setDate} />
              {form.formState.errors.time?.message && <ErrorText errorText={form.formState.errors.time.message} />}
              <div className="flex justify-between w-full">
                <Button onClick={prevStep}>Назад</Button>
                <Button
                  type="button"
                  className="text-white bg-[#d34545] hover:bg-[#c14142]"
                  onClick={nextStep}
                  disabled={!form.watch('massageType')}
                >
                  Далі
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="w-full flex flex-col gap-4">
                <AppointmentInput name="fullName" placeholder="Ім’я" />
                <AppointmentInput name="phone" placeholder="Номер телефону" />
                <AppointmentInput name="email" placeholder="Пошта" />
              </div>
              <div className="flex justify-between w-full">
                <Button onClick={prevStep}>Назад</Button>
                <Button type="submit" loading={isLoading}>
                  Confirm Booking
                </Button>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </div>
  );
};
