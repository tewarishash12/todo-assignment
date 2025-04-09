'use client'

import TodoLayout from '@/app/components/TodoLayout';
import { fetchTodos } from '@/app/lib/api';
import { useEffect, useState } from 'react';
import { Todo } from './typecheck/typeCheck';

export default function HomePage() {
    const [todo, setTodo] = useState<Todo[]>([]);

    useEffect(() => {
        async function getTodos() {
            try {
                const tasks = await fetchTodos();
                setTodo(tasks.todos);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Failed to fetch todos:", err.message);
                } else {
                    console.error("An unknown error occurred while fetching todos.");
                }
            }
        }

        getTodos();
    }, []);

    return <TodoLayout todos={todo || []} />;
}
