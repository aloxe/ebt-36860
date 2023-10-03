import { Header } from '@/components/header/header';
import type { Metadata } from 'next';
import { AuthProvider } from '../hooks/authprovider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eurobilltracker ▤ 36860 ▥',
  description: 'Map your eurobilltracker trips in France',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="/favicon.ico" rel="icon"></link>
      </head>
      <AuthProvider>
        <body>
          <Header />
          <main className="flex min-h-screen flex-col p-8 mt-12">
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  )
}
