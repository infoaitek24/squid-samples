import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { SquidContextProvider } from '@squidcloud/react';
import { getSquidOptions } from '@/utils/squid';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'Sample notes app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SquidContextProvider options={getSquidOptions()}>
        <body className={inter.className}>{children}</body>
      </SquidContextProvider>
    </html>
  );
}
