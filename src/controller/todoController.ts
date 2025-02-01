import {
  AddNewTaskService,
  GettingAllTodosService,
  deleteTodoService,
  taskcompletdService,
} from "../service/todoService";
import { rewardPoint, totolpoint } from "../service/rewardService";
import express, { Request, Response } from "express";

// adding the new task
export const NewTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    // user ID getting from the token
    const userId: any = (req as any).user.id;
    if (!userId) {
      res.status(401).json({ error: "User is not authorized" });
    }
    // new task add
    const newtask = await AddNewTaskService(task, userId);
    // sending respose
    res.status(200).json({ message: "New task added ", newtask });
  } catch (error) {
    console.log(error, "adding new task");
    res
      .status(500)
      .json({ error: "something went wrong when adding new task" });
  }
};

// getting the all data

export const AllTask = async (req: Request, res: Response) => {
  try {
    const userId: any = (req as any).user.id;
    console.log("this is user id", userId);
    const alltodos = await GettingAllTodosService(userId);
    console.log(alltodos);
    res.status(200).json({ message: "All todos", alltodos });
  } catch (error) {
    console.log(error, "geting the all task ");
    res.status(500).json({ error: "Someting went wrong ..." });
  }
};

// delete
export const DeleteTodo = async (req: Request, res: Response) => {
  try {
    // user id
    const userID = (req as any).user.id;
    const id = parseInt(req.params.id);
    const deltodo = await deleteTodoService(userID, id);
    res.status(200).json({ message: "deleted todo", deltodo });
  } catch (error) {
    console.log(error, " deleting task ");
    res.status(500).json({ error: "Someting went wrong ..." });
  }
};

// task completd

export const TaskCompeted = async (req: Request, res: Response) => {
  try {
    const { done } = req.body;
    const id: number = parseInt(req.params.id);
    console.log("task completed status");
    // const taskDoneController = await taskcompletdService(id, done);
    //  rewared  point   20 points
    // const reward = await rewardPoint(id, 20);
    // simple used the promise Optimized
    const [taskDoneController, reward] = await Promise.all([
      taskcompletdService(id, done),
      rewardPoint(id, 20),
    ]);
    res.status(201).json({
      message: "Congratulations you have successfully completed this task",
      taskDoneController,
      reward,
    });
  } catch (error) {
    console.log(error, " deleting task ");
    res
      .status(500)
      .json({ error: "something went wrong when u upadted done task ..." });
  }
};

// all completed task
export const Allcompletedtask = async (req: Request, res: Response) => {
  try {
    const userId: any = (req as any).user.id;
    console.log("this is user id", userId);
    //  task completed
    const completedTask = await GettingAllTodosService(userId, true);
    console.log(completedTask);
    res
      .status(200)
      .json({ message: "All completed task will be", completedTask });
  } catch (error) {
    console.log(error, "geting the all completed Task ");
    res.status(500).json({ error: "Someting went wrong ..." });
  }
};

// analytics user

export const analytics_user_performance = async (
  req: Request,
  res: Response
) => {
  // user id , and all todo point
  const userid = (req as any).user.id;
  const totalPoint = await totolpoint(userid);
  console.log(`User ${userid} has total points:`, totalPoint);

  res
    .status(200)
    .json({ message: `total point is ${totalPoint._sum.point}`, totalPoint });
};
