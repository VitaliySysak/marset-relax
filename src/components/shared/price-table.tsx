import React from 'react';
import { cn } from '@/lib/utils';
import { priceList } from '@/data/prices-data';
import { PriceCard } from './price-card';

interface Props {
  className?: string;
}

export const PriceTable: React.FC<Props> = ({ className }) => {
  return (
    <table
      className={cn(
        'w-full md:border-2 md:border-[#374151] border-separate border-spacing-0 rounded-2xl overflow-hidden',
        className,
      )}
    >
      <tbody className='flex flex-col gap-4 md:gap-0'>
        {priceList.map((item, index) => (
          <PriceCard key={index} item={item} />
        ))}
      </tbody>
    </table>
  );
};
