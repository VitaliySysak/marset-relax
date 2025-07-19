import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  if (body.password === process.env.DASHBOARD_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set('auth', 'true', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
