'use client';
import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoNavbar from './TodoNavbar';
import { fetchTodos } from '../lib/api';
import TodoCard from './TodoCard';
import { Todo } from '../typecheck/typeCheck';
import Image from 'next/image';

interface TodosProps {
    todos: Todo[];
}

export default function TodoLayout({ todos}: TodosProps ) {
    const [currentPage, setCurrentPage] = useState(1);
    const [tasks, setTasks] = useState<Todo[]>(todos || []);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    const [hasNextPage, setHasNextPage] = useState(false);

    const TASKS_PER_PAGE = 10;

    const handleAddNewTask = () => {
        setSelectedTodo(null);
    };

    const loadPage = async (page: number) => {
        const data = await fetchTodos(page, TASKS_PER_PAGE);
        setTasks(data.todos);
        setHasNextPage(data.hasNextPage || data.todos.length === TASKS_PER_PAGE);
    };

    useEffect(() => {
        loadPage(currentPage);
    }, [currentPage]);

    const handleNext = () => setCurrentPage((prev) => prev + 1);
    const handlePrev = () => setCurrentPage((prev) => prev - 1);

    const handleSave = () => {
        loadPage(currentPage);
        setSelectedTodo(null);
    };

    return (
        <>
            <TodoNavbar />
            <div className="flex justify-around items-start h-[calc(100vh-60px)] w-full overflow-hidden bg-gray-200 px-4 py-6">
                <aside className="w-[30%] max-w-[360px] bg-gray-200 rounded-md h-full p-4 scroll-hidden">
                    <button
                        onClick={handleAddNewTask}
                        className="mb-4 bg-black text-white p-2 rounded hover:bg-gray-800 flex items-center justify-center gap-2"
                    >
                        <Image 
                        src="/add-icon.svg"
                        alt="todo-list"
                        width={25}
                        height={30}
                        />
                        Add New Task
                    </button>
                    <div className="flex flex-col gap-3 mb-4">
                        {tasks.map((todo: Todo) => (
                            <TodoCard
                                key={todo._id}
                                todo={todo}
                                selectedTodo={selectedTodo}
                                onSelect={setSelectedTodo}
                            />
                        ))}
                    </div>

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

                <main className="w-[60%] h-full overflow-y-auto">
                    <TodoForm
                        key={selectedTodo?._id || 'new'}
                        id={selectedTodo?._id ?? 'new'}
                        initial={selectedTodo}
                        onSave={handleSave}
                    />
                </main>
            </div>
        </>
    );
}
