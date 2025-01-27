import { PrismaClient } from "@prisma/client";
import exp from "constants";
const prisma = new PrismaClient();
//  function to intercat with database

export async function AddNewTaskService(task: string, userID: any) {
  const newTask = await prisma.todo.create({
    data: {
      task,
      userId: userID,
    },
  });
  console.log(newTask);
  return newTask;
}

// getting the all todos

export async function GettingAllTodosService(UserId: number) {
  const Alltodos = await prisma.todo.findMany({
    where: { userId: UserId },
  });
  console.log(Alltodos);
  return Alltodos;
}
// deleted todo
export async function deleteTodoService(userID: any, id: number) {
  // detetd by id
  const deltodo = await prisma.todo.delete({
    where: { id: id },
  });
  console.log(deltodo);
  return deltodo;
}
// export default AddNewTask;
