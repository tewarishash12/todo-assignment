const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchTodos(page = 1, limit = 10) {
    const res = await fetch(`${BASE_URL}/todos?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch todos');
    return await res.json();
}

export async function fetchTodoById(id: string) {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        headers: { 'Cache-Control': 'no-store' },
    });
    if (!res.ok) throw new Error('Failed to fetch todo');
    return await res.json();
}

export async function createTodo(data: { title: string; description: string }) {
    const res = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return await res.json();
}

export async function updateTodo(id: string, data: { title: string; description: string }) {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return await res.json();
}
