// src/components/TodoForm.tsx
'use client';

import { useState } from 'react';
import { updateTodo } from '../lib/api';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react'

export default function TodoForm({ id, initial }: { id: string; initial: any }) {
    const router = useRouter();
    const [title, setTitle] = useState(initial.title || '');
    const [description, setDescription] = useState(initial.description || '');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await updateTodo(id, { title, description });
            router.push('/todos');
            router.refresh();
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update. Check console.');
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow max-w-3xl mx-auto space-y-4">
            <div className="flex justify-between items-start">
                <input
                    className="text-2xl font-semibold text-gray-800 w-full focus:outline-none"
                    placeholder="New Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button type="button" title="Delete" className="text-gray-400 hover:text-red-600">
                    <Trash2 size={20} />
                </button>
            </div>
            <hr />
            <textarea
                className="w-full min-h-[120px] text-gray-700 focus:outline-none resize-none"
                placeholder="Enter your notes here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="text-right">
                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
