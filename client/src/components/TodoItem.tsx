import React from "react";
import type { Todo } from "../features/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <li
      className={`flex justify-between items-start p-4 rounded-xl border transition duration-300 ${
        todo.done
          ? "bg-green-50 border-green-200 line-through opacity-70"
          : "bg-white hover:shadow-md border-gray-200"
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo._id)}
            className="accent-indigo-500"
          />
          <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
        </div>
        {todo.description && (
          <p className="text-sm text-gray-500 ml-6">{todo.description}</p>
        )}
      </div>
      <div className="flex gap-3 mt-2 sm:mt-0 sm:ml-4">
        <button
          onClick={() => onEdit(todo)}
          className="text-indigo-500 hover:text-indigo-700 font-medium text-sm"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="text-red-500 hover:text-red-700 font-medium text-sm"
        >
          🗑️ Delete
        </button>
      </div>
    </li>
  );
};
