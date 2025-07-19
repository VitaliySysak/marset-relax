import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Toaster } from 'react-hot-toast';

export const Providers: React.FC<React.PropsWithChildren> = async ({ children }) => {
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
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>{children}</AppRouterCacheProvider>
    </>
  );
};
