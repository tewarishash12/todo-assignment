// src/components/TodoCard.tsx
import Link from 'next/link';

export default function TodoCard({ todo }: { todo: any }) {
    return (
        <Link href={`/todos/${todo._id}`} className="block">
            <div className="p-4 bg-white hover:bg-gray-100 border rounded-lg shadow-sm transition-all duration-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-800">
                        {todo.title}
                    </h2>
                    <span className="text-xs text-gray-400">
                        {new Date(todo.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {todo.description}
                </p>
            </div>
        </Link>
    );
}
