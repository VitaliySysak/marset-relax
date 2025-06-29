'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ContainerTextFlip } from '../ui/container-text-flip';
import { heroWords } from '@/data/hero-words';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn('flex justify-between mt-10', className)}>
      <div className="flex sm:block flex-col items-center md:max-w-[400px]  lg:max-w-[640px] lg:mt-18">
        <h1 className="w-full px-2 text-[32px] lg:text-[48px] font-semibold">
          Тіло і Спокій — Преміум <br /> масаж для життя <br />
          без{' '}
          <span className="inline-block translate-y-[4px]">
            <ContainerTextFlip className="font-bold" words={heroWords} />
          </span>
        </h1>
        <div className="relative md:hidden mt-12">
          <figure className="absolute rounded-full -left-6 -top-8 border-4 border-[var(--figures)] border-opacity-100 h-[100px] w-[100px]" />
          <img className="w-full rounded-[40px] px-2 " src="/images/hero.webp" alt="hero" />
        </div>
        <p className="mt-12 text-[18px]">
          Пропонуємо класичний, антистресовий, глибокотканинний і спортивний масаж — з індивідуальним підходом до
          кожного клієнта. Ми використовуємо якісні натуральні олії, працюємо в затишному темному інтер'єрі з
          приглушеним світлом та музикою, що сприяє повному розслабленню.
        </p>
        <Link href="/#contact">
          <Button className="mt-8 text-[20px] py-8 px-24 w-fit rounded-[25px] font-bold">Зв’язатись</Button>
        </Link>
      </div>
      <aside className="hidden md:block relative">
        <figure className="absolute rounded-full -left-12 border-4 border-[var(--figures)] border-opacity-100 h-[150px] w-[150px]" />
        <img className="w-[520px] h-[700px] rounded-t-[160px]" src="/images/hero.webp" alt="hero" />
      </aside>
    </section>
  );
};
