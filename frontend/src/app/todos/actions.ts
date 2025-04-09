'use server';

export async function createTodoAction() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
    });

    if (!res.ok) throw new Error('Failed to create todo');
    return await res.json();
}
