import Link from 'next/link';
import Image from 'next/image'

export default function Header() {
	return (
		<div className='top-0 p-0 m-0 h-12 bg-sky-200 border-b-2 border-black fixed w-full'>
			<div className='p-2 border-red-400 text-black md:text-xl font-semibold'>
				<a
					className="pointer-events-auto m-0"
					href="/"
				>
					<img 
						src="/france.png" alt="France" 
						width={48}
						height={48}
						className='m-1 inline-block'
						/>
					<Image
						src='/france.png'
						alt='France'
						width={48}
						height={48}
						priority
					/>
					Eurobilltracker ▤ 36860 ▥
				</a>
			</div>
		</div>
	)
}
