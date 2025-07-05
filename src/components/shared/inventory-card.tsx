import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  name: string;
  imgUrl: string;
}

export const InventoryCard: React.FC<Props> = ({ className, name, imgUrl }) => {
  return (
    <div className="m-auto">
      <img
        className={cn('h-[240px] w-[240px] sm:w-[120px] sm:h-[120px] md:w-[160px] md:h-[160px] lg:h-[240px] lg:w-[240px] rounded-full', className)}
        src={imgUrl}
        alt="inventory card"
      />
      <p className="text-center mt-4">{name}</p>
    </div>
  );
};
