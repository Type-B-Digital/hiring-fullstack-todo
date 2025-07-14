import express from "express";
import { TodoController } from "../controllers/TodoController";

const router = express.Router();
const controller = new TodoController();

router.get("/", controller.getAllTodos);
router.post("/", controller.createTodo);
router.put("/:id", controller.updateTodo);
router.patch("/:id/done", controller.toggleDone);
router.delete("/:id", controller.deleteTodo);

export default router;
