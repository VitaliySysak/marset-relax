'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Video: React.FC<Props> = ({ className }) => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={cn('min-h-[300px]', className)}>
      <video
        className="w-full rounded-3xl"
        width="1280"
        height="360"
        controls
        autoPlay
        muted
        loop
        preload="none"
        playsInline
      >
        {isReady && (
          <source src="/video/massage-showcase.mp4" type="video/mp4" />
        )}
        Браузер не підтримує відео
      </video>
    </section>
  );
};
