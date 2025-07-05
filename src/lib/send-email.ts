import { TContactSchema } from '../components/shared/contact/schema';
import axios from 'axios';

export default async function sendEmail(data: TContactSchema) {
  await axios.post('/api/contact', data);
}
