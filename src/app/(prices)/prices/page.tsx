import { PriceTable } from '@/components/shared/price-table';
import { priceListTitle } from '@/data/prices-data';

export default function Prices() {
  return (
    <main className="px-[clamp(20px,6vw,40px)] md:px-[60px] xl:px-[clamp(60px,8vw,200px)]">
      <div className='flex flex-col my-8'>
        <h1 className="text-center text-[28px] 2xl:text-[48px] font-medium">Преміальний догляд за тілом</h1>
        <h2 className="text-center text-[16px] 2xl:text-[32px] text-[#CBD5E1]">
          {priceListTitle}
        </h2>
      </div>
      <PriceTable />
    </main>
  );
}
