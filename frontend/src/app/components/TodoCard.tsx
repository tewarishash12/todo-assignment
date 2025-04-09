import { Todo } from "../typecheck/typeCheck";

interface TodoCardProps {
    todo: Todo;
    selectedTodo: Todo | null;
    onSelect: (todo: Todo) => void;
}

export default function TodoCard({ todo, selectedTodo, onSelect }: TodoCardProps) {
    const isSelected = selectedTodo?._id === todo._id;

    return (
        <div
            onClick={() => onSelect(todo)}
            className={`cursor-pointer p-4 border rounded-lg shadow-sm transition-all duration-200 ${
                isSelected
                    ? 'border-black bg-gray-200' // Darker bg + solid black border for selected
                    : 'border-gray-200 bg-white hover:bg-gray-100'
            }`}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-gray-800">
                    {todo?.title}
                </h2>
                <span className="text-xs text-gray-400">
                    {new Date(todo?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {todo?.description}
            </p>
        </div>
    );
}