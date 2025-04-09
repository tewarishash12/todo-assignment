import TodoLayout from '@/app/components/TodoLayout';
import { fetchTodos } from '@/app/lib/api';

export default async function TodosPage() {
    const todos = await fetchTodos(); 

    return <TodoLayout todos={todos} />;
}
