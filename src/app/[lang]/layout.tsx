import type { Metadata } from 'next';
import { dir } from 'i18next'
import { languages } from '@/i18n/settings'
import { AuthProvider } from '@/context/authcontext';
import Header from '@/components/header/header';
import Footer from '@/components/header/footer';

import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Eurobilltracker ▤ 36680 ▥',
  description: 'Map your eurobilltracker trips in France',
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: string}
}) {
  return (
    <AuthProvider>
      <html lang={lang} dir={dir(lang)}>
          <head>
            <link href="/favicon.ico" rel="icon"></link>
          </head>
          <body>
            <Header lang={lang}/>
            <main className="flex flex-col mt-12 p-2 pb-6 md:p-8">
              {children}
            </main>
            <Footer lang={lang} />
            {/* allow safari users to log in https://itnext.io/fixing-focus-for-safari-b5916fef1064 */}
            <script type="text/javascript" src="/js/polyfill-focus.js" async />
          </body>
      </html>
    </AuthProvider>
  )
}
