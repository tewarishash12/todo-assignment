'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchTodoById } from '@/app/lib/api';
import TodoForm from '@/app/components/TodoForm';
import { Todo } from '@/app/typecheck/typeCheck';

export default function EditTodo() {
    const router = useRouter();
    const params = useParams();
    const [todo, setTodo] = useState<Todo | null>(null);

    useEffect(() => {
        const id = params.id;
        if (typeof id === 'string') {
            fetchTodoById(id).then(setTodo);
        }
    }, [params.id]);

    if (!todo) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <main className="max-w-xl mx-auto py-10">
            <h1 className="text-2xl font-semibold mb-4">Edit Todo</h1>
            <TodoForm
                id={params.id as string}
                initial={todo}
                onSave={() => {
                    router.push('/todos');
                    router.refresh();
                }}
            />
        </main>
    );
}
