import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { useFormContext } from 'react-hook-form';
import { ErrorText } from './error-text';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
}

export const AppointmentInput: React.FC<Props> = ({ className, name, ...props }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const errorText = errors[name]?.message as string;
  return (
    <div className={cn('', className)}>
      <Input
        {...props}
        className={cn(
          'border rounded-md border-[#4a4a55] px-3 py-5 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d34545] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-muted',
          className,
        )}
        {...register(name)}
      />

      <ErrorText className="mt-2" errorText={errorText} />
    </div>
  );
};
