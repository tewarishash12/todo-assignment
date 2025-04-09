'use client';

import { useState } from 'react';
import { createTodo, updateTodo } from '../lib/api';
import { Trash2 } from 'lucide-react';
import { Todo } from '../typecheck/typeCheck';

interface TodoFormProps {
    id: string;
    initial: Todo | null;
    onSave: () => void;
}

export default function TodoForm({ id, initial, onSave }: TodoFormProps) {
    const [title, setTitle] = useState(initial?.title || '');
    const [description, setDescription] = useState(initial?.description || '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id === 'new') {
                await createTodo({ title, description });
            } else {
                await updateTodo(id, { title, description });
            }
            onSave();
        } catch (error) {
            console.error('Save failed:', error);
            alert('Failed to save. Check console.');
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
