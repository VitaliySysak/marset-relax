'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { createSlotSchema, TCreateSlotSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { DatePickerInput } from '@/components/ui/date-picker-input';
import createSlot from '@/services/create-appointment';

interface Props {
  className?: string;
}

export const ReservationForm: React.FC<Props> = ({ className }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TCreateSlotSchema>({
    resolver: zodResolver(createSlotSchema),
    defaultValues: {
      reserved: false,
      time: '',
    },
  });

  const onSubmit = async (data: TCreateSlotSchema) => {
    try {
      setIsLoading(true);
      alert(JSON.stringify(data));
      await createSlot(data);
      form.reset();
      toast.success('надіслано успішно!');
    } catch (error) {
      console.error('Error while execution contact/onSubmit:', error);
      toast.error('сталася помилка при відправленні, спробуйте пізніше', { icon: '❌' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn('', className)}>
      <FormProvider {...form}>
        <form className="relative flex flex-col items-center gap-8 2xl:gap-16" onSubmit={form.handleSubmit(onSubmit)}>
          <DatePickerInput label="Час початку" name="time" />
          <Button
            loading={isLoading}
            className="w-[260px] text-[16px] py-6 px-16 lg:py-6 lg:px-20 rounded-[20px] font-bold bg-[#292A2E]"
          >
            ДОДАТИ СЛОТ
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
