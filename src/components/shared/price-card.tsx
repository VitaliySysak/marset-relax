import React from 'react';
import { cn } from '@/lib/utils';
import { Bonus } from './bonus';
import { Button } from '../ui/button';
import { Massage } from '@prisma/client';
import Link from 'next/link';

interface Props {
  className?: string;
  item: Massage;
}

export const PriceCard: React.FC<Props> = ({ className, item }) => {
  const { name, price, durationMin, bonuses } = item;
  return (
    <tr
      className={cn(
        'flex flex-col md:flex-row justify-between p-4 border-1 border-[#374151] bg-[#2a2e37]',
        'md:rounded-none rounded-2xl',
        'md:hover:scale-none',
        className,
      )}
    >
      <td className="flex flex-col gap-2">
        <h3 className="text-[20px] md:text-[28px]">{name}</h3>
        <div className="flex gap-2 mt-2 flex-wrap">
          {bonuses.map((bonus, index) => (
            <Bonus key={index} title={bonus} />
          ))}
        </div>
      </td>
      <td className="flex flex-row md:flex-col justify-between items-center mt-4 md:mt-0">
        <div className="flex items-center">
          <span className="text-secondary">₴{price}</span>{' '}
          <span className="text-[20px] text-[#9CA3AF]"> / {durationMin}хв</span>
        </div>
        <Link href="/#contact">
          <Button className="px-6">Записатись</Button>
        </Link>
      </td>
    </tr>
  );
};
