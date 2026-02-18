'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface BookmarkFormProps {
    onSuccess: () => void;
}

export default function BookmarkForm({ onSuccess }: BookmarkFormProps) {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                throw new Error('User not authenticated')
            }

            const { error: insertError } = await supabase
                .from('bookmarks')
                .insert([
                    {
                        title,
                        url,
                        user_id: user.id
                    }
                ])

            if (insertError) throw insertError

            setTitle('')
            setUrl('')
            onSuccess()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My favorite tool"
                    required
                    className="h-10 px-3 rounded-lg border border-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="url" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    URL
                </label>
                <input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                    className="h-10 px-3 rounded-lg border border-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                />
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="h-10 rounded-lg bg-black text-white font-medium hover:bg-zinc-800 disabled:opacity-50 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
                {loading ? 'Adding...' : 'Add Bookmark'}
            </button>
        </form>
    )
}
