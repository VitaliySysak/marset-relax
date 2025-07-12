import type { Metadata } from 'next';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export const metadata: Metadata = {
  title: 'Master Relax',
  description: 'Отож, до ваших послуг: авторський масаж, класичний масаж, спортивний масаж, відновлювальний масаж, лімфодренажний масаж, антицелюлітний масаж, масаж обличчя та декольте, впкуумно-градієва терапія, баночний масаж, тригерна терапія, релакс масаж',
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
