import React from 'react';
import { cn } from '@/lib/utils';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { testimonials } from '@/data/page-data';

interface Props {
  className?: string;
  
}

export const Testemonials: React.FC<Props> = ({className}) => {


  return (
    <section className={cn("mt-12", className)}>
      <h1 className='w-full text-center text-[36px] font-semibold'>Відгуки задоволених клієнтів</h1>
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </section>
  );
};
