import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/auth/actions'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/')
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
            <main className="flex w-full max-w-2xl flex-col items-center gap-8 rounded-2xl bg-white p-12 shadow-sm dark:bg-zinc-900">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
                        Dashboard
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Welcome back, <span className="font-semibold text-black dark:text-zinc-50">{user.email}</span>!
                    </p>
                </div>

                <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex flex-col items-center gap-6">
                    <p className="text-zinc-500 dark:text-zinc-500">
                        You are successfully signed in with Google.
                    </p>

                    <form action={signOut}>
                        <button
                            type="submit"
                            className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-8 font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                        >
                            Sign Out
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}
