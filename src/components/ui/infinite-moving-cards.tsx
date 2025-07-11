'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState, useCallback } from 'react';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    photoUrl: string;
    quote: string;
    mark: number;
  }[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--animation-direction', direction === 'left' ? 'forwards' : 'reverse');
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const duration = speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s';
      containerRef.current.style.setProperty('--animation-duration', duration);
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full h-[420px] md:h-[320px] shrink-0 flex-nowrap gap-4 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[450px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 px-8 py-6 md:w-[650px] dark:border-zinc-700 bg-[#1A1C2B]"
            key={idx}
          >
            <blockquote className="flex flex-col justify-between cursor-default h-full">
              <span className="relative z-20 text-sm leading-[1.6] text-[18px] text-gray-100">{item.quote}</span>
              <div className="relative z-20 mt-6 flex flex-row items-center justify-between">
                <span className="flex flex-col gap-1">
                  <img src={item.photoUrl} className="w-[48px] h-[48px] rounded-full object-cover" alt={item.name} />
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.name}
                  </span>
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <img className="w-[28px] h-[28px]" key={index} src="/icons/star.png" alt="зірка" />
                  ))}
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
