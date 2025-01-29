import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import Providers from '@/components/ui/providers';

const sora = Sora({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Schelendar',
  description: 'Schelendar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${sora.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
