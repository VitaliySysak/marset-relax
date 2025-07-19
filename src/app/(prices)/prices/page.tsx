export const dynamic = 'force-dynamic'

import { PriceTable } from '@/components/shared/price-table';
import { priceListTitle } from '../../../../data/prices-data';
import { Container } from '@/components/shared/container';
import getMassages from '@/services/get-prices';

export default async function Prices() {
  const massages = await getMassages();
  return (
    <main>
      <Container>
        <div className="flex flex-col my-8">
          <h1 className="text-center text-[28px] 2xl:text-[48px] font-medium">Преміальний догляд за тілом</h1>
          <h2 className="text-center text-[16px] 2xl:text-[32px] text-[#CBD5E1]">{priceListTitle}</h2>
        </div>
        <PriceTable massages={massages} />
      </Container>
    </main>
  );
}
