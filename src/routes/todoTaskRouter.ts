import express, { Request, Response } from "express";
const router = express.Router();
import AuthVerify from "../middleware/auth";
import {
  NewTask,
  AllTask,
  DeleteTodo,
  TaskCompeted,
  Allcompletedtask,
  analytics_user_performance,
} from "../controller/todoController";

// new task function

// todo
router.post("/new", AuthVerify, NewTask); //new task
router.post("/task-complete/:id", AuthVerify, TaskCompeted); //task comepled
router.get("/AllTask", AuthVerify, AllTask); //getting all task
router.delete("/DeleteTodo/:id", AuthVerify, DeleteTodo); //delete task
router.get("/all/completed", AuthVerify, Allcompletedtask); //getting all complted task
router.get("/check/score", AuthVerify, analytics_user_performance); //analytics user
export default router;
