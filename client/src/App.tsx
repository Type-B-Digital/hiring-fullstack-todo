import React, { useState } from "react";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useToggleDoneMutation,
  useDeleteTodoMutation,
} from "./features/api/apiSlice";
import type { Todo } from "./features/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const App: React.FC = () => {
  const { data, isLoading } = useGetTodosQuery();
  const todos = data?.data ?? [];
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [toggleDone] = useToggleDoneMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [editing, setEditing] = useState<Todo | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await createTodo(data);
    reset();
  };

  const handleToggle = async (id: string) => {
    await toggleDone(id);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = (formData.get("title") as string).trim();
    const description = formData.get("description") as string;

    if (!title) {
      setEditError("Title cannot be empty.");
      return;
    }
    setEditError(null);

    if (editing) {
      await updateTodo({ id: editing._id, data: { title, description } });
      setEditing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-6 text-center">
          🌟 TODO App
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 flex flex-col sm:flex-row gap-3"
        >
          <input
            {...register("title")}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter task title"
          />
          <input
            {...register("description")}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Optional description"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md transition duration-300"
          >
            Add
          </button>
        </form>

        {errors.title && (
          <p className="text-red-500 mb-4">{errors.title.message}</p>
        )}

        {isLoading ? (
          <p className="text-center text-gray-600">Loading todos...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one!</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo: Todo) => (
              <li
                key={todo._id}
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
                      onChange={() => handleToggle(todo._id)}
                      className="accent-indigo-500"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {todo.title}
                    </h3>
                  </div>
                  {todo.description && (
                    <p className="text-sm text-gray-500 ml-6">
                      {todo.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 mt-2 sm:mt-0 sm:ml-4">
                  <button
                    onClick={() => setEditing(todo)}
                    className="text-indigo-500 hover:text-indigo-700 font-medium text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 bg-opacity-70 flex items-center justify-center z-50"
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onSubmit={handleEditSubmit}
              className="bg-white p-6 rounded-xl shadow-md w-96"
            >
              <h2 className="text-xl font-bold mb-4">Edit Task</h2>
              {editError && <p className="text-red-500 mb-3">{editError}</p>}
              <input
                name="title"
                defaultValue={editing.title}
                className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                name="description"
                defaultValue={editing.description}
                className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Save
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
