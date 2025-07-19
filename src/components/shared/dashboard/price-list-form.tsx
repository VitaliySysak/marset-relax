'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { priceListSchema, TPriceListSchema } from '@/schemas/price-list-schrema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
}

export const PriceListForm: React.FC<Props> = ({ className }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TPriceListSchema>({
    resolver: zodResolver(priceListSchema),
    defaultValues: {
      name: '',
      price: undefined,
      durationMin: undefined,
      description: '',
      bonuses: '',
    },
  });

  const onSubmit = async (data: TPriceListSchema) => {
    try {
      setIsLoading(true);
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
    <div className={cn('', className)}>
      <FormProvider {...form}>
        <form className="relative flex flex-col items-center gap-8 2xl:gap-16" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="w-full text-[28px] lg:text-[32px] xl:text-[42px] 2xl:text-[60px] font-semibold text-center">
            Зв’яжіться з нами
          </h1>
          <FormInput name="name" placeholder="Назва" />
          <FormInput name="price" placeholder="Ціна" type="phone" />
          <FormInput name="durationMin" placeholder="Тривалість" />
          <FormInput name="description" placeholder="Опис" />
          <FormInput name="bonuses" placeholder="Бонуси" />
          <Button
            loading={isLoading}
            className="w-[260px] text-[16px] py-6 px-16 lg:py-6 lg:px-20 rounded-[20px] font-bold bg-[#292A2E]"
          >
            ЗБЕРЕГТИ
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
