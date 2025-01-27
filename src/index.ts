import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
import connection from "./db/connection";
import todoTaskRouter from "./routes/todoTaskRouter";
import UserRouter from "./routes/userRouter";
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// db connection

connection();
app.use("/user", UserRouter);
app.use("/todo", todoTaskRouter);
// Endpoint to handle GET requests
app.get("/test", (req: Request, res: Response) => {
  const data = Math.random().toString();

  res.cookie("test", data, {
    maxAge: 10000,
    httpOnly: true,
  });

  res.send("GET request received. Cookie set!");
});

// Start the server

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
