import React from "react";
import { motion } from "framer-motion";
import type { Todo } from "../features/types";

interface EditModalProps {
  todo: Todo;
  onClose: () => void;
  onSubmit: (id: string, data: { title: string; description: string }) => void;
  error?: string | null;
  setError: (msg: string | null) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  todo,
  onClose,
  onSubmit,
  error,
  setError,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = (formData.get("title") as string).trim();
    const description = formData.get("description") as string;
    if (!title) return setError("Title cannot be empty.");
    onSubmit(todo._id, { title, description });
    setError(null);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <input
          name="title"
          defaultValue={todo.title}
          className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          name="description"
          defaultValue={todo.description}
          className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        ></textarea>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
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
  );
};
