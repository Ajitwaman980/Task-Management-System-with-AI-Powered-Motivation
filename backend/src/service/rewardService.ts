import prisma from "../utils/prismaClient";

// Add 20 points
export async function rewardPoint(todoId: number, point: number = 20) {
  try {
    const existingTask = await prisma.todo.findUnique({
      where: { id: todoId },
    });
    console.log("this is todo id", todoId);
    console.log("existingTask", existingTask);

    if (!existingTask) {
      throw new Error(`Task with id ${todoId} not found.`);
    }

    const existingReward = await prisma.rewardPoint.findFirst({
      where: { todoId: todoId },
    });

    if (existingReward) {
      const updatedReward = await prisma.rewardPoint.update({
        where: { id: todoId },
        data: {
          point: point,
          totalPoint: { increment: point },
        },
      });
      console.log("Reward updated:", updatedReward);
      return updatedReward;
    } else {
      const newReward = await prisma.rewardPoint.create({
        data: {
          point: point,
          totalPoint: point,
          todo: {
            connect: { id: todoId },
          },
        },
      });
      console.log("New reward created:", newReward);
      return newReward;
    }
  } catch (error) {
    console.error("Error in rewardPoint function:", error);
    throw new Error("Failed to update or create reward points.");
  }
}

// total point
export async function totolpoint(userid: any) {
  // fetching
  const totalPoint = await prisma.rewardPoint.aggregate({
    _sum: { point: true },
    where: { todo: { userId: userid } },
  });
  console.log("Total Points:", totalPoint._sum.point || 0);
  return totalPoint;
}
//  motivation
