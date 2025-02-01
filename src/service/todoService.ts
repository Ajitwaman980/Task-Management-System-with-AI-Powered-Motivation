import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//  function to intercat with database

export async function AddNewTaskService(task: string, userID: any) {
  const newTask = await prisma.todo.create({
    data: {
      task,
      userId: userID,
    },
  });
  // console.log(newTask);
  return newTask;
}

// getting the all todos
export async function GettingAllTodosService(UserId: number, done?: boolean) {
  const Alltodos = await prisma.todo.findMany({
    where: { userId: UserId, done: done },
  });
  // console.log(Alltodos);
  return Alltodos;
}
// deleted todo
export async function deleteTodoService(userID: any, id: number) {
  // detetd by id
  const deltodo = await prisma.todo.delete({
    where: { id: id },
  });
  // console.log(deltodo);
  return deltodo;
}
// competed the task
export async function taskcompletdService(id: number, done: boolean) {
  const taskDone = await prisma.todo.update({
    where: { id: id },
    data: {
      done: done,
    },
  });
  return taskDone;
}
