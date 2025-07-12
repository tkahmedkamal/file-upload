import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'File Upload',
  description: 'File Upload with Next.js',
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <main className="flex h-screen items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
