import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/prisma-client';

export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    const deleted = await prisma.appointmentSlot.delete({
      where: { id },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error('DELETE /appointment/delete-slot/[id] failed:', error);
    return new Response('Server Error', {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
