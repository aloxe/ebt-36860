import Image from 'next/image';
import { Login } from './login';

export default function Header() {
  return (
    <div className='grid grid-cols-4 gap-4 top-0 p-0 m-0 h-12 bg-sky-200 border-b-2 border-black fixed w-full z-1001'>
      <div className='col-span-3 p-2 text-black text-xs sm:text-sm md:text-lg font-semibold'>
        <a
          className="pointer-events-auto m-0 no-underline text-black font-bold"
          href="/"
        >
          <Image
            src="/france.png" alt="France"
            width={48}
            height={48}
            className='m-1 inline-block'
          />
          <span className='inline-block text-center'>Eurobilltracker ▤ 36680 ▥</span>
        </a>
      </div>
      <div className='mr-2 p-2 text-black'>
        <Login />
      </div>
		</div>
	)
}
