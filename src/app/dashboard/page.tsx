import { Login } from './login';

export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <h1>Eurobilltracker ▤ 36860 ▥</h1>
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                <Login />
            </div>
        </div>

        </main>
    )
}
