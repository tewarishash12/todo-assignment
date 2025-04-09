// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to the Todo App</h1>
        <Link href="/todos">
          <a className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200">
            Go to Todos
          </a>
        </Link>
      </div>
    </main>
  );
}
