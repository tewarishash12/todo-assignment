import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTodos(page = 1, limit = 10) {
    const res = await axios.get(`${BASE_URL}/todos`, {
        params: { page, limit }
    });
    return res.data;
}

export async function fetchTodoById(id: string) {
    const res = await axios.get(`${BASE_URL}/todos/${id}`, {
        headers: { 'Cache-Control': 'no-store' },
    });
    return res.data;
}

export async function createTodo(data: { title: string; description: string }) {
    const res = await axios.post(`${BASE_URL}/todos`, data);
    return res.data;
}

export async function updateTodo(id: string, data: { title: string; description: string }) {
    const res = await axios.put(`${BASE_URL}/todos/${id}`, data, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
}
