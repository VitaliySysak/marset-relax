'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
