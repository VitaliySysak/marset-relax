import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div className={cn('px-[clamp(20px,6vw,40px)] md:px-[60px] xl:px-[clamp(60px,8vw,200px)]', className)}>
      {children}
    </div>
  );
};
