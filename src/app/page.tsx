import { AboutUs } from '@/components/shared/about-us';
import { Hero } from '@/components/shared/hero';
import { Inventory } from '@/components/shared/inventory';
import { Location } from '@/components/shared/location';
import { PhotoCarousel } from '@/components/shared/photo-carousel';
import { Video } from '@/components/shared/video';

export default function Home() {
  return (
    <main className="px-[clamp(20px,6vw,40px)] md:px-[60px] xl:px-[clamp(60px,8vw,200px)]">
      <Hero />
      <Video />
      <AboutUs />
      <Inventory />
      <PhotoCarousel />
      <Location />
    </main>
  );
}
