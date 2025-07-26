'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { navBarLinks } from '../../../data/home-data';
import { Drawer } from '../ui/drawer';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  return (
    <header className={cn('h-[80px] sm:h-[96px] 2xl:h-[112px] font-title font-semibold', className)}>
      <div className="flex justify-between items-center px-[clamp(20px,6vw,40px)] md:px-[60px] xl:px-[clamp(40px,8vw,260px)] h-full">
        <Link href="/">
          <img
            className="w-[200px] h-[44px] md:w-[280px] md:h-[60px] lg:w-[350px] lg:h-[80px]"
            src="/images/logo.webp"
            alt="logo"
          />
        </Link>
        <nav className="h-[80px] flex items-center relative">
          {/* Mobile */}
          <>
            <button aria-label='open nav menu'>
              <RxHamburgerMenu
                onClick={() => setIsDrawerOpen((prev) => !prev)}
                className="block sm:hidden w-[30px] h-[30px] cursor-pointer"
              />
            </button>
            <Drawer onClose={() => setIsDrawerOpen(false)} isOpen={isDrawerOpen} />
          </>

          {/* Desktop */}
          <ul
            className={cn(
              'hidden sm:flex justify-between gap-[clamp(20px,4vw,40px)] text-[16px] md:text-[18px] lg:text-[24px]',
            )}
          >
            {navBarLinks.map(({ title, href }, index) => (
              <li className='hover:underline underline-offset-4 decoration-2 decoration-blue-500' key={index}>
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute inset-y-0 left-0 h-full w-px">
        <div className="absolute top-0 sm:top-8 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px">
        <div className="absolute top-0 sm:top-8 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <hr className="border-0 h-[2px] bg-primary w-full" />
    </header>
  );
};
