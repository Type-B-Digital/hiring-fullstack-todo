import React, { useState } from "react";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useToggleDoneMutation,
  useDeleteTodoMutation,
} from "./features/api/apiSlice";
import type { Todo } from "./features/types";
import { AnimatePresence } from "framer-motion";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { EditModal } from "./components/EditModal";

const App: React.FC = () => {
  const { data, isLoading } = useGetTodosQuery();
  const todos = data?.data ?? [];
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [toggleDone] = useToggleDoneMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [editing, setEditing] = useState<Todo | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-6 text-center">
          🌟 TODO App
        </h1>

        <TodoForm onSubmit={createTodo} />

        {isLoading ? (
          <p className="text-center text-gray-600">Loading todos...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one!</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={toggleDone}
                onEdit={setEditing}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}
      </div>

      <AnimatePresence>
        {editing && (
          <EditModal
            todo={editing}
            onClose={() => setEditing(null)}
            onSubmit={(id, data) => updateTodo({ id, data })}
            error={editError}
            setError={setEditError}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
