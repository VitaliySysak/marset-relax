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
import { isAxiosError } from 'axios';

interface Props {
  className?: string;
  onClose: () => void;
}

export const BookModal: React.FC<Props> = ({ className, onClose }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState<1 | 2 | 3>(1);

  const stepFields = {
    1: ['massageType'],
    2: ['time'],
    3: ['fullName', 'phone', 'email'],
  } as const;

  const nextStep = async () => {
    const fieldsToValidate = stepFields[step] || [];
    const isValid = await form.trigger(fieldsToValidate, { shouldFocus: true });
    if (isValid) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const prevStep = () => {
    setStep((prev) => {
      if (prev === 3) return 2;
      if (prev === 2) return 1;
      return 1;
    });
  };

  const isNextDisabled = () => {
    if (step === 1) return !form.watch('massageType');
    if (step === 2) return !form.watch('time');
    if (step === 3) return !form.watch('fullName') && !form.watch('phone') && !form.watch('email');
    return false;
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
      toast.success('Очікуйте, масажист зв’яжеться з вами найближчим часом');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.data?.code === 'SLOT_ALREADY_RESERVED') {
          toast.error('Цей слот вже зайнятий іншим користувачем', { icon: '⚠️' });
        } else {
          toast.error('Сталася помилка при відправленні, спробуйте пізніше', {
            icon: '❌',
          });
        }
      } else {
        toast.error('Немає з’єднання з сервером.');
      }
      console.error('Error in onSubmit:', error);
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'fixed flex flex-col w-full h-screen overflow-y-auto dark:[color-scheme:dark] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary lg:w-[1000px] xl:w-[1200px] md:h-[80vh] md:rounded-2xl py-8 sm:py-4 px-4 shadow-2xl z-100',
        className,
      )}
    >
      <FormProvider {...form}>
        <div className="flex justify-between items-center">
          <h1 className="text-[28px] font-extrabold text-[#d34545] text-left">Зарезервуйте масаж</h1>
          <IoClose
            onClick={onClose}
            className="cursor-pointer text-[#adadb1] hover:text-[#7a7a7f] transition-colors duration-200"
          />
        </div>

        <form
          className="flex flex-col relative justify-between items-center h-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {step === 1 && (
            <>
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
            </>
          )}

          {step === 2 && (
            <>
              <BookCalendar className="mt-24" date={date} setDate={setDate} />
              {form.formState.errors.time?.message && <ErrorText errorText={form.formState.errors.time.message} />}
              <div className="flex justify-between w-full">
                <Button onClick={prevStep}>Назад</Button>
                <Button
                  type="button"
                  className="text-white bg-[#d34545] hover:bg-[#c14142]"
                  onClick={nextStep}
                  disabled={isNextDisabled()}
                >
                  Далі
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex flex-col w-full mt-24 gap-4">
                <div className="flex items-center w-full gap-2">
                  <FiUser color="#d34545" />
                  <h3 className="text-[20px] font-medium">Ваші данні</h3>
                </div>
                <div className="w-full flex flex-col gap-4">
                  <AppointmentInput name="fullName" placeholder="Ім’я" />
                  <AppointmentInput name="phone" placeholder="Номер телефону" />
                  <AppointmentInput name="email" placeholder="Пошта" />
                </div>
              </div>

              <div className="flex justify-between w-full">
                <Button onClick={prevStep}>Назад</Button>
                <Button
                  type="submit"
                  loading={isLoading}
                  className="text-white bg-[#d34545] hover:bg-[#c14142] min-w-16"
                  disabled={isNextDisabled()}
                >
                  Записатись
                </Button>
              </div>
            </>
          )}
          <div className="block md:hidden w-full h-4 flex-shrink-0" />
        </form>
      </FormProvider>
    </div>
  );
};
