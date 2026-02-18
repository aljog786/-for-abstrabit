import { createClient } from "@/lib/supabase/server";
import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">Bookmark App</h1>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {user ? "Welcome back!" : "To get started, please sign in."}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {user
              ? `You are currently signed in as ${user.email}. Head over to your dashboard to manage your bookmarks.`
              : "This app helps you organize your bookmarks with ease. Sign in with your Google account to get started."
            }
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          {user ? (
            <>
              <Link
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-5 text-white transition-colors hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc] md:w-[158px]"
                href="/dashboard"
              >
                Go to Dashboard
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </main>
    </div>
  );
}

