import './globals.css';
import { Providers } from '@/components/shared/providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" type="image/x-icon" href="/icons/master-relax.ico" />
        <link rel="robots" href="/robots.txt" />
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
