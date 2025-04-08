// src/app/todos/edit/[id]/page.tsx
import { fetchTodoById } from '@/app/lib/api';
import TodoForm from '@/app/components/TodoForm';

export default async function EditTodo({ params }: { params: { id: string } }) {
    const todo = await fetchTodoById(params.id);

    return (
        <main className="max-w-xl mx-auto py-10">
            <h1 className="text-2xl font-semibold mb-4">Edit Todo</h1>
            <TodoForm id={params.id} initial={todo} />
        </main>
    );
}
