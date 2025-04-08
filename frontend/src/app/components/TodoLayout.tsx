// src/components/TodoLayout.tsx
'use client';

import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoNavbar from './TodoNavbar';

export default function TodoLayout({ todos }: { todos: any }) {
    const tasks = todos.todos;
    const [selectedTodo, setSelectedTodo] = useState(tasks[0]);

    return (
        <>
            <TodoNavbar />
            <div className="flex h-screen w-full overflow-hidden bg-gray-200">
                {/* Sidebar */}
                <aside className="w-[320px] bg-white border-r shadow-sm overflow-y-auto flex flex-col">
                    {/* Navbar */}

                    {/* Todo List */}
                    <div className="flex flex-col gap-2 p-2">
                        {tasks.map((todo: any) => (
                            <div
                                key={todo._id}
                                onClick={() => setSelectedTodo(todo)}
                                className={`cursor-pointer rounded-lg p-4 border transition duration-200 ${selectedTodo._id === todo._id
                                    ? 'border-black bg-gray-50'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <h2 className="text-sm font-semibold">{todo.title}</h2>
                                <p className="text-xs text-gray-500 truncate">{todo.description}</p>
                                <p className="text-xs text-gray-400 text-right mt-1">
                                    {new Date(todo.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Editor Panel */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {selectedTodo ? (
                        <TodoForm id={selectedTodo._id} initial={selectedTodo} />
                    ) : (
                        <div className="text-center text-gray-500 mt-20">
                            Select a todo from the left panel.
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
