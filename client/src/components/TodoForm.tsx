import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type FormData = z.infer<typeof schema>;

interface TodoFormProps {
  onSubmit: (data: FormData) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitAndReset = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitAndReset)}
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
        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
      )}
    </>
  );
};
