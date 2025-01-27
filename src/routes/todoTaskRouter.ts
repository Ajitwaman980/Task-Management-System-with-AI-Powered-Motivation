import express, { Request, Response } from "express";
const router = express.Router();
import AuthVerify from "../middleware/auth";
import { NewTask, AllTask, DeleteTodo } from "../controller/todoController";

// new task function

// todo
router.post("/new", AuthVerify, NewTask);
router.get("/AllTask", AuthVerify, AllTask);
router.delete("/DeleteTodo/:id", AuthVerify, DeleteTodo);
//

export default router;
