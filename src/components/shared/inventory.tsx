import React from 'react';
import { cn } from '@/lib/utils';
import { inventoryCards, inventoryTitle } from '@/data/home-data';
import { InventoryCard } from './inventory-card';

interface Props {
  className?: string;
}

export const Inventory: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn(
        'hidden shadow-2xl sm:flex flex-col justify-evenly mt-16 md:mt-0 md:relative -top-10 bg-primary min-h-[580px] lg:min-h-[800px] w-full rounded-[20px] px-12  -z-10',
        className,
      )}
    >
      <h1 className="w-full text-center text-[32px] lg:text-[42px] xl:text-[42px] 2xl:text-[60px] font-semibold mt-8">
        {inventoryTitle}
      </h1>
      <div className="grid grid-cols-1 grid-rows-6 sm:grid-cols-3 sm:grid-rows-2 gap-y-12">
        {inventoryCards.map(({ name, imgUrl }, index) => (
          <InventoryCard key={index} name={name} imgUrl={imgUrl} />
        ))}
      </div>
    </section>
  );
};
