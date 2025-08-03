import Script from 'next/script';
import './globals.css';
import { Providers } from '@/components/shared/providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/icons/master-relax.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://master-relax.com.ua',
    title: 'Професійний масаж у Львові від Master Relax',
    description:
      'Відновіть сили та відчуйте гармонію з Master Relax у Львові. Професійні техніки масажу для повного розслаблення та зняття стресу.',
    siteName: 'Master Relax',
    locale: 'uk_UA',
    images: [{ url: '/images/opengraph-image.png', width: 1200, height: 630, alt: 'Preview image' }],
  },
  manifest: '/manifest.json',
  robots: '/robots.txt',
  other: {
    'google-site-verification': 'rL2ohyaPB9EAdzkm6VZIEu1O93R5NuaNU3GQI1jqCcw',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="min-h-screen flex flex-col justify-between">
        <Providers>{children}</Providers>

        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
