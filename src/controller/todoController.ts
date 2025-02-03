import {
  AddNewTaskService,
  GettingAllTodosService,
  deleteTodoService,
  taskcompletdService,
} from "../service/todoService";
import { rewardPoint, totolpoint } from "../service/rewardService";
import { generateMotivationMessage } from "../service/generate_Motivation_Message ";
import prisma from "../utils/prismaClient";

import express, { Request, Response } from "express";

// Add a new task
export const NewTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;

    const userId: any = (req as any).user.id;

    if (!userId) {
      res.status(401).json({ error: "User is not authorized" });
      return;
    }

    // Add new task
    const newtask = await AddNewTaskService(task, userId);
    // Send response
    res.status(200).json({ message: "New task added", newtask });
  } catch (error) {
    console.log(error, "adding new task");
    res
      .status(500)
      .json({ error: "Something went wrong when adding the new task" });
  }
};

// Get all tasks
export const AllTask = async (req: Request, res: Response) => {
  try {
    const userId: any = (req as any).user.id;
    console.log("User ID:", userId);

    const alltodos = await GettingAllTodosService(userId);
    console.log(alltodos);

    res.status(200).json({ message: "All todos", alltodos });
  } catch (error) {
    console.log(error, "getting all tasks");
    res.status(500).json({ error: "Something went wrong..." });
  }
};

// Delete a task
export const DeleteTodo = async (req: Request, res: Response) => {
  try {
    const userID = (req as any).user.id;
    const id = parseInt(req.params.id);

    const deltodo = await deleteTodoService(userID, id);
    res.status(200).json({ message: "Deleted todo", deltodo });
  } catch (error) {
    console.log(error, "deleting task");
    res.status(500).json({ error: "Something went wrong..." });
  }
};

// Mark task as completed
export const TaskCompeted = async (req: Request, res: Response) => {
  try {
    const done = true;

    const id: number = parseInt(req.params.id);
    const username: string = (req as any).user.name;

    // already completed
    const task = await prisma.todo.findUnique({
      where: { id: id },
      select: { done: true, task: true },
    });

    if (task?.done) {
      res.status(400).json({
        message: `The  ${task.task}is already marked as completed.`,
      });
      return;
    }

    // used promise for optimization this run all at time
    const [taskDoneController, reward, MotivationMessage] = await Promise.all([
      taskcompletdService(id, done),
      rewardPoint(id, 20),
      generateMotivationMessage(username, id),
    ]);

    res.status(201).json({
      message: MotivationMessage,
      taskDoneController,
      reward,
    });
  } catch (error) {
    console.log(error, "updating task completion");
    res
      .status(500)
      .json({ error: "Something went wrong when updating the task" });
  }
};

// Get all completed tasks
export const Allcompletedtask = async (req: Request, res: Response) => {
  try {
    const userId: any = (req as any).user.id;
    console.log("User ID:", userId);

    // Get completed tasks
    const completedTask = await GettingAllTodosService(userId, true);
    console.log(completedTask);

    res.status(200).json({ message: "All completed tasks", completedTask });
  } catch (error) {
    console.log(error, "getting all completed tasks");
    res.status(500).json({ error: "Something went wrong..." });
  }
};

// User analytics (performance & points)
export const analytics_user_performance = async (
  req: Request,
  res: Response
) => {
  try {
    const userid = (req as any).user.id;
    const totalPoint = await totolpoint(userid);
    console.log(`User ${userid} has total points:`, totalPoint);

    res.status(200).json({
      message: `Total points: ${totalPoint._sum.point}`,
      totalPoint,
    });
  } catch (error) {
    console.log(error, "getting user analytics");
    res.status(500).json({ error: "Something went wrong..." });
  }
};
