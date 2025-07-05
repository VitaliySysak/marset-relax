'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import sendEmail from '@/lib/send-email';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, TContactSchema } from './schema';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
}

export const ContactUs: React.FC<Props> = ({ className }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: TContactSchema) => {
    try {
      setIsLoading(true);
      await sendEmail(data);
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
    <section id="contact" className={cn('flex flex-col md:flex-row gap-16 pt-12 2xl:px-16', className)}>
      <div className="bg-primary w-[720px] rounded-2xl p-12 shadow-2xl">
        <FormProvider {...form}>
          <form className="relative flex flex-col items-center gap-16" onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="w-full text-[32px] lg:text-[42px] xl:text-[42px] 2xl:text-[60px] font-semibold text-center">
              Зв’яжіться з нами
            </h1>
            <FormInput name="fullName" placeholder="Ім’я" />
            <FormInput name="email" placeholder="Пошта" />
            <FormInput name="phone" placeholder="Номер телефону" type="phone" />
            <Textarea name="message" placeholder="Коментар" />
            <Button
              loading={isLoading}
              className="min-w-[300px] text-[20px] py-6 px-16 lg:py-6 lg:px-20 w-fit rounded-[20px] font-bold"
            >
              ЗАПИСАТИСЬ НА МАСАЖ
            </Button>
          </form>
        </FormProvider>
      </div>
      <aside className="flex flex-col items-center gap-4 pl-36 flex-1">
        <img className="w-full max-h-[500px] rounded-2xl" src="/images/contact.jpg" />{' '}
        <div className='flex flex-col gap-4'>
          <h2 className='text-[36px] font-semibold'>Ваше тіло заслуговує турботи</h2>
          <p>
            Бажаєте записатися на масаж або отримати консультацію? Заповніть форму — і ми обов’язково зв’яжемося з
            вами якнайшвидше.
          </p>
        </div>
      </aside>
    </section>
  );
};
