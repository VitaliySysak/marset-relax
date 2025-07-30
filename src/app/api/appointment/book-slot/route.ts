import prisma from '../../../../../prisma/prisma-client';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { bookSlotSchema } from '@/schemas/book-slot-schema';

const { BOT_TOKEN, MARIA_CHAT_ID, IHOR_CHAT_ID } = process.env;

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = bookSlotSchema.parse(json);

    const { email, phone, fullName, duration, massageType, slotId } = body;

    const client = await prisma.client.create({
      data: {
        email,
        phone,
        fullName,
      },
    });

    const appointmentSlot = await prisma.appointmentSlot.findFirst({ where: { id: slotId, reserved: false } });

    if (!appointmentSlot) {
      return new Response(
        JSON.stringify({ message: 'Цей слот вже зайнятий іншим користувачем', code: 'SLOT_ALREADY_RESERVED' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const updateAppointmentSlot = await prisma.appointmentSlot.update({
      where: {
        id: slotId,
      },
      data: { clientId: client.id, reserved: true },
    });

    const clientMessage = `
      *Користувач записався!*
      *Ім'я:* ${fullName}
      *Пошта:* ${email}
      *Телефон:* ${phone}
      *Масаж:* ${massageType}
      *Тривалість:* ${duration} хв
      *Час:* ${appointmentSlot.time.toLocaleString()}
      `;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: MARIA_CHAT_ID,
      text: clientMessage,
    });

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: IHOR_CHAT_ID,
      text: clientMessage,
    });

    return NextResponse.json(updateAppointmentSlot, { status: 201 });
  } catch (error) {
    console.error('Error while execution route.ts/contact/post:', error);
    return new Response(JSON.stringify('Server Error'), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
