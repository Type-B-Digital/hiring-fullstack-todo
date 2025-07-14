import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { TodoService } from "../services/TodoService";

const todoService = new TodoService();

export class TodoController extends BaseController {
  getAllTodos = async (req: Request, res: Response) => {
    try {
      const todos = await todoService.findAll();
      this.success(res, todos);
    } catch (err) {
      this.error(res, err as Error);
    }
  };

  createTodo = async (req: Request, res: Response) => {
    try {
      const todo = await todoService.create(req.body);
      this.success(res, todo, "Todo created");
    } catch (err) {
      this.error(res, err as Error);
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    try {
      const updated = await todoService.update(req.params.id, req.body);
      this.success(res, updated, "Todo updated");
    } catch (err) {
      this.error(res, err as Error);
    }
  };

  toggleDone = async (req: Request, res: Response) => {
    try {
      const updated = await todoService.toggleDone(req.params.id);
      this.success(res, updated, "Todo status toggled");
    } catch (err) {
      this.error(res, err as Error);
    }
  };

  deleteTodo = async (req: Request, res: Response) => {
    try {
      await todoService.delete(req.params.id);
      this.success(res, null, "Todo deleted");
    } catch (err) {
      this.error(res, err as Error);
    }
  };
}
