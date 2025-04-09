'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchTodoById } from '@/app/lib/api';
import TodoForm from '@/app/components/TodoForm';
import { Todo } from '@/app/typecheck/typeCheck';

type PageProps = {
    params: {
        id: string;
    };
};

export default function EditTodo({ params }: PageProps) {
    const router = useRouter();
    const [todo, setTodo] = useState<Todo | null>(null);

    useEffect(() => {
        const loadTodo = async () => {
            const data = await fetchTodoById(params.id);
            setTodo(data);
        };
        loadTodo();
    }, [params.id]);

    if (!todo) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <main className="max-w-xl mx-auto py-10">
            <h1 className="text-2xl font-semibold mb-4">Edit Todo</h1>
            <TodoForm
                id={params.id}
                initial={todo}
                onSave={() => {
                    router.push('/todos');
                    router.refresh();
                }}
            />
        </main>
    );
}
