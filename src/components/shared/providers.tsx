'use client';

import { Toaster } from 'react-hot-toast';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: 'var(--primary)',
            color: '#fff',
          },
        }}
      />
      {children}
    </>
  );
};
