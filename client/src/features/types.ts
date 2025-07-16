export interface Todo {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoResponse {
  data: Todo[] | [];
  message: string;
  success: boolean;
}
