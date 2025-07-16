import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo, TodoResponse } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoResponse, void>({
      query: () => "todos",
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: "todos",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<Todo, { id: string; data: Partial<Todo> }>({
      query: ({ id, data }) => ({
        url: `todos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
    toggleDone: builder.mutation<Todo, string>({
      query: (id) => ({
        url: `todos/${id}/done`,
        method: "PATCH",
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useToggleDoneMutation,
  useDeleteTodoMutation,
} = apiSlice;
