'use client';
import { useRouter } from 'next/navigation';
import { HeroUIProvider } from '@heroui/react';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  return (
    <HeroUIProvider navigate={push}>
      <Toaster position="bottom-right" richColors />
      {children}
    </HeroUIProvider>
  );
}
