import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const connection = async () => {
  try {
    await prisma.$connect();
    // console.log(connect);
    console.log("connection done successfully");
  } catch (err) {
    console.log(err);
    console.log("connection error: " + err);
  }
};
export default connection;
