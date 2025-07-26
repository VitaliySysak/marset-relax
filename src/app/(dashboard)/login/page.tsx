'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Wrong password');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-2xl"
          placeholder="Введіть пароль"
        />
        <Button className="w-32" onClick={handleLogin}>
          Увійти
        </Button>
      </div>
    </div>
  );
}
