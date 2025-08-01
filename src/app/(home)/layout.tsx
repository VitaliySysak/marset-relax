import type { Metadata } from 'next';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export const metadata: Metadata = {
  title: 'Професійний масаж у Львові - Master Relax',
  description:
    'Масаж у Львові, Master Relax це місце, де якісний масаж поєднується з вигідними цінами та комфортом. Працюємо Пн-Нд: 09:00-20:00, пропонуємо зручний запис і чудовий сервіс.',
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
