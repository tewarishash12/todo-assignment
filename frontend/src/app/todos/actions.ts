'use server';

import axios from "axios";

export async function createTodoAction() {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        headers: { 'Content-Type': 'application/json' },
    });

    return res.data;
}
