'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Bookmark } from '@/lib/types'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'
import { signOut } from '@/app/auth/actions'

interface DashboardClientProps {
    initialUserEmail: string | undefined;
}

export default function DashboardClient({ initialUserEmail }: DashboardClientProps) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    const fetchBookmarks = useCallback(async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setBookmarks(data)
        }
        setLoading(false)
    }, [supabase])

    useEffect(() => {
        fetchBookmarks()
    }, [fetchBookmarks])

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black p-8">
            <main className="flex w-full max-w-2xl flex-col gap-8">
                {/* Header Profile Section */}
                <div className="flex items-center justify-between w-full bg-white p-6 rounded-2xl shadow-sm dark:bg-zinc-900">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-black dark:text-zinc-50">Dashboard</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{initialUserEmail}</p>
                    </div>
                    <form action={signOut}>
                        <button
                            type="submit"
                            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium py-2 px-4 rounded-lg transition-colors dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        >
                            Sign Out
                        </button>
                    </form>
                </div>

                {/* Add Bookmark Section */}
                <div className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-sm dark:bg-zinc-900">
                    <h2 className="text-lg font-semibold dark:text-zinc-50">Add New Bookmark</h2>
                    <BookmarkForm onSuccess={fetchBookmarks} />
                </div>

                {/* Bookmark List Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-lg font-semibold dark:text-zinc-50">Your Bookmarks</h2>
                        {loading && <span className="text-sm text-zinc-400">Loading...</span>}
                    </div>
                    <BookmarkList bookmarks={bookmarks} onDelete={fetchBookmarks} />
                </div>
            </main>
        </div>
    )
}
