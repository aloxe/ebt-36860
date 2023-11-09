import Image from 'next/image';
import Login from './login';
import Link from 'next/link';
import { useTranslation } from '@/i18n'
import { languages } from '@/i18n/settings'
import { Trans } from 'react-i18next';

export default async function Footer({ lang }: {lang: string}) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'translations')

  return (
    <div className='grid grid-cols-4 gap-4 bottom-0 p-0 m-0 h-20 bg-sky-200 border-t-2 border-black w-full'>
      <div className='col-span-3 p-4 text-black text-xs sm:text-sm'>

      {languages.map((l, index) => {
        const isL = l === lang;
        return (
          <span key={l}>
            {index > 0 && (' | ')}
            {isL && <span className='border-2 border-yellow-900 p-2 font-semibold text-yellow-900'>
              {l}
            </span>}
            {!isL && <Link href={`/${l}`} className='border-2 border-stone-600 p-2 bg-slate-50 font-semibold no-underline'>
              {l}
            </Link>}
          </span>
        )
      })} 
      | <Link href="https://forum.eurobilltracker.com/viewtopic.php?f=20&t=57328">help translate</Link>

      </div>
	</div>
	)
}
