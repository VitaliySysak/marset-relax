'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import dashboardLogin from '@/services/dashboard-login';

export default function LoginPage() {
  const [password, setPassword] = useState('');

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-2xl"
          placeholder="Введіть пароль"
        />
        <Button className="w-32" onClick={()=> dashboardLogin(password)}>
          Увійти
        </Button>
      </div>
    </div>
  );
}
