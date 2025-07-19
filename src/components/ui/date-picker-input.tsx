import React from 'react';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { Input } from './input';
import { ErrorText } from './error-text';
import { Label } from './label';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label: string;
}

export const DatePickerInput: React.FC<Props> = ({ className, name, label, ...props }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const errorText = errors[name]?.message as string;

  return (
    <div className={cn('', className)}>
      <Label className="text-2xl text-center">{label}</Label>
      <Input {...props} type="datetime-local" {...register(name)} />
      <ErrorText errorText={errorText} />
    </div>
  );
};
