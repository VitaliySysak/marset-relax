import React from 'react';
import { cn } from '@/lib/utils';
import { lat, lng } from '@/data/home-data';

interface Props {
  className?: string;
}

export const Location: React.FC<Props> = ({ className }) => {
  return (
    <section id="location" className={cn('flex flex-col-reverse lg:flex-row justify-center md:pt-20', className)}>
      <iframe
        className="w-full h-[400px] md:h-[500px] 2xl:h-[600px] rounded-2xl"
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${lat},${lng}`}
      ></iframe>
      <div className="flex flex-col px-12 justify-evenly gap-4 mb-16 text-center">
        <div>
          <h1 className="text-[48px] font-semibold">Адреса</h1>
          <p>
            м.Львів <br /> Окуневського, 3
          </p>
        </div>
        <div>
          <h1 className="text-[48px] font-semibold">Номер</h1>
          <p>+380965181114</p>
        </div>
        <div>
          <h1 className="text-[48px] font-semibold">Пошта</h1>
          <p>
            master.relax <br /> .lviv@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};
