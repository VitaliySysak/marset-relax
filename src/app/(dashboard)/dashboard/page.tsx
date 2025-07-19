export const dynamic = 'force-dynamic'
import { Container } from '@/components/shared/container';
import { ReservationForm } from '@/components/shared/dashboard/add-slots-form';
import { AppointmentList } from '@/components/shared/dashboard/appointment-list';
import getSlots from '@/services/get-appointments';

export default async function Dashboard() {
  const slots = await getSlots();
  return (
    <main>
      {!slots && <h1>error</h1>}
      <Container>
        <ReservationForm />
        <AppointmentList slots={slots} />
      </Container>
    </main>
  );
}
