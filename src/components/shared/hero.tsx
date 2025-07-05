'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ContainerTextFlip } from '../ui/container-text-flip';
import { heroDescription, heroUrl, heroWords } from '@/data/page-data';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn('md:h-screen pb-[80px] sm:pb-[96px] 2xl:pb-[112px] flex justify-between items-center', className)}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center mb-8 md:mb-16">
        <div className="flex flex-col gap-16 mt-8">
          <h1 className="w-full px-2 sm:px-0 text-[32px] lg:text-[42px] xl:text-[42px] 2xl:text-[60px] font-semibold">
            Тіло і Спокій — Преміум <br /> масаж у Львові для життя <br />
            без{' '}
            <span className="inline-block translate-y-[4px]">
              <ContainerTextFlip className="font-bold" interval={4000} words={heroWords} />
            </span>
          </h1>
          <div className="relative md:hidden">
            <figure className="absolute rounded-full -left-6 -top-8 border-4 border-[var(--figures)] h-[100px] w-[100px]" />
            <img className="w-full rounded-[40px] px-2 " src="/images/hero.webp" alt="hero" />
          </div>
          <p className="text-[18px] md:text-[16px] lg:text-[20px] 2xl:text-[22px] md:max-w-[360px] lg:max-w-[500px] 2xl:lg:max-w-[700px]">
            {heroDescription}
          </p>
          <Link className="flex justify-center md:justify-start" href="/#contact">
            <Button className="text-[20px] py-6 px-16 lg:py-8 lg:px-24 w-fit rounded-[25px] font-bold">
              Зв’язатись
            </Button>
          </Link>
        </div>
      </div>
      <aside className="hidden md:flex h-fit flex-col justify-center relative">
        <figure className="absolute rounded-full -left-8 xl:-left-12 top-0 border-4 border-[var(--figures)] h-[120px] w-[120px] xl:h-[150px] xl:w-[150px]" />
        <img
          className="w-[clamp(300px,40vw,360px)] lg:w-[400px] xl:w-[clamp(400px,30vw,500px)] 2xl:w-[500px] rounded-t-[124px] xl:rounded-t-[150px] 2xl:rounded-t-[164px] shadow-2xl"
          src={heroUrl}
          alt="hero"
        />
      </aside>
    </section>
  );
};
