import {
  AddNewTaskService,
  GettingAllTodosService,
  deleteTodoService,
} from "../service/todoService";
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
