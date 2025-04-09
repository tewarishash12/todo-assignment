'use client'

import TodoLayout from '@/app/components/TodoLayout';
import { fetchTodos } from '@/app/lib/api';
import { useEffect, useState } from 'react';
import { Todo } from '../typecheck/typeCheck';

export default function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodos().then(setTodos).catch(console.error);
    }, []);

    console.log(todos)

    return <TodoLayout todos={todos} />;
}
