'use client';
import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoNavbar from './TodoNavbar';
import { fetchTodos } from '../lib/api'; // Make sure this import exists

export default function TodoLayout({ todos }: { todos: any }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [tasks, setTasks] = useState<any[]>(todos.todos || []);
    const [selectedTodo, setSelectedTodo] = useState<any>(null);
    const [hasNextPage, setHasNextPage] = useState(false);

    const TASKS_PER_PAGE = 10;

    const handleAddNewTask = () => {
        setSelectedTodo(null);
    };

    const loadPage = async (page: number) => {
        const data = await fetchTodos(page, TASKS_PER_PAGE);
        setTasks(data.todos);
        setHasNextPage(data.hasNextPage || data.todos.length === TASKS_PER_PAGE); // fallback
    };

    useEffect(() => {
        loadPage(currentPage);
    }, [currentPage]);

    const handleNext = () => setCurrentPage((prev) => prev + 1);
    const handlePrev = () => setCurrentPage((prev) => prev - 1);

    return (
        <>
            <TodoNavbar />
            <div className="flex justify-around items-start h-[calc(100vh-60px)] w-full overflow-hidden bg-gray-200 px-4 py-6">
                {/* Sidebar/List Panel */}
                <aside className="w-[30%] max-w-[360px] bg-white border shadow-sm rounded-md h-full overflow-y-auto p-4">
                    <button
                        onClick={handleAddNewTask}
                        className="mb-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                        + Add New Task
                    </button>
                    <div className="flex flex-col gap-3 mb-4">
                        {tasks.map((todo: any) => (
                            <div
                                key={todo._id}
                                onClick={() => setSelectedTodo(todo)}
                                className={`cursor-pointer rounded-lg p-4 border transition duration-200 ${
                                    selectedTodo?._id === todo._id
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

                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-auto">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!hasNextPage}
                            className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </aside>

                {/* Form Panel */}
                <main className="w-[60%] h-full overflow-y-auto">
                    <TodoForm key={selectedTodo?._id || 'new'} id={selectedTodo?._id ?? 'new'} initial={selectedTodo} />
                </main>
            </div>
        </>
    );
}
