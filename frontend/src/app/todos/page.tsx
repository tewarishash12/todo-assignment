'use client'

import TodoLayout from '@/app/components/TodoLayout';
import { fetchTodos } from '@/app/lib/api';
import { useState } from 'react';
import { Todo } from '../typecheck/typeCheck';

export default function TodosPage() {
    const [todo, setTodo] = useState<Todo[]>([]);

    useEffect(() => {
        async function getTodos(){
            try {
                const tasks = await fetchTodos();
                setTodos(tasks.todos);
            } catch(err: unknown){
                if (err instanceof Error) {
                    console.error("Failed to fetch todos:", err.message);
                } else {
                    console.error("An unknown error occurred while fetching todos.");
                }
            }
        }

        getTodos();
    }, []);

    console.log(todos)

    return <TodoLayout todos={todo || []} />;
}
