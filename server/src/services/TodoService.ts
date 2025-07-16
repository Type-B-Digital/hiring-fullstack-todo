import { BaseService } from "./BaseService";
import Todo, { ITodo } from "../models/Todo";

export class TodoService extends BaseService<ITodo> {
  constructor() {
    super(Todo);
  }

  async toggleDone(id: string): Promise<ITodo | null> {
    const todo = await this.findById(id);
    if (!todo) {
      const error: any = new Error("Todo item not found with the provided ID");
      error.statusCode = 404;
      throw error;
    }
    todo.done = !todo.done;
    return todo.save();
  }
}
