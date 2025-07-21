import prisma from '../../../../../../prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const appointmentSlot = await prisma.appointmentSlot.delete({
      where: { id },
    });

    return NextResponse.json(appointmentSlot, { status: 200 });
  } catch (error) {
    console.error('Error while execution delete-slot/[id]/route.ts:', error);
    return new Response(JSON.stringify('Server Error'), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
