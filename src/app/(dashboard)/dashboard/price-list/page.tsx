import { Container } from '@/components/shared/container';
import { PriceListForm } from '@/components/shared/dashboard/price-list-form';

export default async function DashboardPrices() {
  return (
    <main>
      <Container>
        <PriceListForm />
      </Container>
    </main>
  );
}
