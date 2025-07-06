import axios from 'axios';
import { TContactSchema } from '@/components/shared/contact/schema';

const { BOT_TOKEN, MARIA_CHAT_ID, IHOR_CHAT_ID } = process.env;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TContactSchema;
    const { fullName, email, phone, message } = body;

    const clientMessage = `
    Користувач із сату Master Relax
    Ім'я: ${fullName}
    Пошта: ${email}
    Телефон: ${phone}
    Повідомлення: ${message}
    `;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: MARIA_CHAT_ID,
      text: clientMessage,
    });

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: IHOR_CHAT_ID,
      text: clientMessage,
    });

    return new Response(JSON.stringify('OK'), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error while execution route.ts/contact/post:', error);
    return new Response(JSON.stringify('Server Error'), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
