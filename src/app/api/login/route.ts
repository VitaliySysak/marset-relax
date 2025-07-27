import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.DASHBOARD_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set('auth', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 3600, // 1 hour
    });

    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
