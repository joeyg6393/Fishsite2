import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Reel Authority',
  description: 'Your trusted source for fishing tips, gear reviews, and angling adventures',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
