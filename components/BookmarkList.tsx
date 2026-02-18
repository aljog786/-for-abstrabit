'use client'

import { Bookmark } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'

interface BookmarkListProps {
    bookmarks: Bookmark[];
    onDelete: () => void;
}

export default function BookmarkList({ bookmarks, onDelete }: BookmarkListProps) {
    const supabase = createClient()

    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', id)

        if (!error) {
            onDelete()
        }
    }

    if (bookmarks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 rounded-2xl dark:border-zinc-800">
                <p className="text-zinc-500">No bookmarks yet. Add one above!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 w-full">
            {bookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    className="group flex items-center justify-between p-4 rounded-xl border border-zinc-100 bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md"
                >
                    <div className="flex flex-col gap-1 overflow-hidden">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                            {bookmark.title}
                        </h3>
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-zinc-500 hover:text-black dark:hover:text-white truncate transition-colors"
                        >
                            {bookmark.url}
                        </a>
                    </div>
                    <button
                        onClick={() => handleDelete(bookmark.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all"
                        aria-label="Delete bookmark"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    )
}
