import type { Metadata } from 'next';
import Header from '../components/header/header';
import { AuthProvider } from '../context/authcontext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eurobilltracker ▤ 36680 ▥',
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
          <main className="flex min-h-screen flex-col p-8 mt-12 xs:p-2">
            {children}
          </main>
          {/* allow safari users to log in https://itnext.io/fixing-focus-for-safari-b5916fef1064 */}
          <script type="text/javascript" src="/js/polyfill-focus.js" async />
        </body>
      </AuthProvider>
    </html>
  )
}
