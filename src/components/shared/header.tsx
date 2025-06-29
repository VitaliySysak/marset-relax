import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { navBarLinks } from '@/data/nav-bar';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('h-[80px] sm:h-[112px]', className)}>
      <div className="flex justify-between items-center px-[clamp(20px,6vw,40px)] md:px-[60px] xl:px-[160px] h-full">
        <Link href="/">
          <img
            className="w-[200px] h-[44px] md:w-[280px] md:h-[60px] lg:w-[350px] lg:h-[80px]"
            src="/images/logo.webp"
            alt="logo"
          />
        </Link>
        <nav className="h-[80px] flex items-center">
          {/* Mobile */}
          <Drawer direction="top">
            <DrawerTrigger>
              <RxHamburgerMenu className="block sm:hidden w-[30px] h-[30px] cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle />
                <DrawerDescription />
              </DrawerHeader>
              <ul className={cn('flex flex-col w-full justify-center font-bold text-lg')}>
                {navBarLinks.map(({ title, href }, index) => (
                  <li key={index} className="text-center">
                    <Link href={href}>{title}</Link>
                  </li>
                ))}
              </ul>
              <DrawerFooter>
                <DrawerClose className="text-[18px] cursor-pointer">Відмінити</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Desktop */}
          <ul
            className={cn(
              'hidden sm:flex justify-between gap-[clamp(20px,4vw,40px)] font-bold text-[16px] md:text-[18px] lg:text-xl',
            )}
          >
            {navBarLinks.map(({ title, href }, index) => (
              <li key={index}>
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <hr className="border-0 h-[2px] bg-primary w-full" />
    </header>
  );
};
