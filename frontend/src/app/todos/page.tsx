// src/app/todos/page.tsx or wherever you fetch data
import TodoLayout from '@/app/components/TodoLayout';
import { fetchTodos } from '@/app/lib/api';

export default async function TodosPage() {
    const todos = await fetchTodos(); // Your API call

    return <TodoLayout todos={todos} />;
}
