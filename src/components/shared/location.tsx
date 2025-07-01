import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Location: React.FC<Props> = ({ className }) => {
  const lat = 49.859812429501645;
  const lng = 24.018092413411644;
  return (
    <section className={cn('flex flex-col-reverse md:flex-row justify-center', className)}>
      <iframe
        className="w-full h-[400px] md:h-[600px] rounded-2xl"
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${lat},${lng}`}
      ></iframe>
      <div className="flex flex-col px-22 justify-evenly mb-16 text-center">
        <div>
          <h1 className='text-[48px] font-semibold'>Адреса</h1>
          <p>йцушопшфп 12</p>
        </div>
        <div>
          <h1 className='text-[48px] font-semibold'>Номер</h1>
          <p>+38052485658</p>
        </div>
        <div>
          <h1 className='text-[48px] font-semibold'>Пошта</h1>
          <p>Ihor@gmail.com</p>
        </div>
      </div>
    </section>
  );
};
