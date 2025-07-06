import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Location: React.FC<Props> = ({ className }) => {
  const lat = 49.859388;
  const lng = 24.017337;
  return (
    <section id="location" className={cn('flex flex-col-reverse md:flex-row justify-center pt-20', className)}>
      <iframe
        className="w-full h-[350px] md:h-[600px] rounded-2xl"
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${lat},${lng}`}
      ></iframe>
      <div className="flex flex-col px-12 justify-evenly mb-16 text-center">
        <div>
          <h1 className="text-[48px] font-semibold">Адреса</h1>
          <p>Львів <br /> Окуневського, 3</p>
        </div>
        <div>
          <h1 className="text-[48px] font-semibold">Номер</h1>
          <p>+380965181114</p>
        </div>
        <div>
          <h1 className="text-[48px] font-semibold">Пошта</h1>
          <p>master.relax.lviv@gmail.com</p>
        </div>
      </div>
    </section>
  );
};
