import { Header } from '@/components/shared/header';
import { Hero } from '@/components/shared/hero';

export default function Home() {
  return (
    <>
      <Header />
      <main className="px-[clamp(20px,6vw,40px)] md:px-[60px] xl:px-[160px]">
        <Hero />
      </main>
    </>
  );
}
