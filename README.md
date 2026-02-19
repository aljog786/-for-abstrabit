# BookmarkApp - Smart Bookmark App

BookmarkApp is a modern, full-stack bookmark management application built with **Next.js 15**, **Supabase**, and **Tailwind CSS**. It provides users with a secure, private space to organize their favorite links with real-time synchronization across multiple devices.

---

## 🚀 Features

- **Google OAuth Login**: Secure authentication powered by Supabase Auth and Google.
- **Private Bookmarks**: Each user has their own isolated space, managed via Row Level Security (RLS).
- **CRUD Operations**: Seamlessly add and delete bookmarks.
- **Real-time Synchronization**: Instant UI updates across multiple tabs or devices using Supabase Realtime (WebSockets).
- **Modern UI**: A clean, responsive design built with Tailwind CSS, supporting both light and dark modes.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 💻 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/for-abstrabit.git
   cd for-abstrabit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Database Schema

The application uses a `bookmarks` table in the `public` schema with the following structure:

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, default: `gen_random_uuid()` |
| `user_id` | `uuid` | References `auth.users(id)`, on delete cascade |
| `title` | `text` | The title of the bookmark |
| `url` | `text` | The destination URL |
| `created_at` | `timestamptz` | Automatically set to `now()` |

---

## 🔐 How Row Level Security (RLS) Works

**Row Level Security (RLS)** is a core security feature of Postgres that Supabase utilizes to protect your data at the database level.

- **Mandatory Security**: WITHOUT RLS, any user with your Public Anon Key could query all bookmarks in the table. With RLS enabled, unauthorized access is blocked by default.
- **`auth.uid()`**: This built-in Supabase function extracts the unique ID of the currently logged-in user from their JWT. 
- **The Policy**: We use a policy: `auth.uid() = user_id`. This tells Postgres: *"Only allow this operation if the user trying to perform it is the owner of this specific row."*

---

## 📡 How Realtime Works

Abstrabit uses **Supabase Realtime** to listen for changes in the database and push updates to the UI without requiring a page refresh.

1. **Postgres Changes**: When you add or delete a bookmark, Postgres emits an event.
2. **WebSocket Connection**: The client maintains a persistent WebSocket connection to the Supabase Realtime engine.
3. **Broadcasting**: The Realtime engine broadcasts the `INSERT` or `DELETE` event to all subscribed clients.
4. **Instant UI Update**: The React `useEffect` hook receives the payload and updates the local state instantly, reflecting the change across all open tabs.

---

## ☁️ Deployment Steps

1. **Vercel Deployment**: Push your code to GitHub and import the project into Vercel.
2. **Environment Variables**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel project settings.
3. **Supabase Redirects**: Ensure your Supabase Auth settings include your production URL:
   - Site URL: `https://your-app-name.vercel.app`
   - Redirect URL: `https://your-app-name.vercel.app/auth/callback`

---

## 🧠 Challenges Faced & Solutions

- **Next.js SSR Session Handling**: Implementing a robust middleare (`proxy.ts`) was essential to ensure that the user session is verified on the server before the page is even rendered, preventing "flashes" of unauthenticated content.
- **RLS Configuration**: Ensuring that the `user_id` was correctly passed from the authenticated session to the database during insertions was critical to satisfying the RLS policies.
- **Stale Build Cache**: After refactoring to a `src/` directory, the build cache needed to be manually cleared to resolve path aliases in generated types.

---

## 🔮 Future Improvements

- **Folder/Category Support**: Group bookmarks into custom folders.
- **Link Previews**: Automatically fetch metadata (title/favicon) from URLs.
- **Search & Filter**: Real-time search to quickly find saved links.
- **Browser Extension**: A companion extension to save links with one click.
