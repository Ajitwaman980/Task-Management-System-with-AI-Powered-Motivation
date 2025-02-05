import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { limiter } from "./middleware/rateLimiter"; //prvent dos attack
import { errorHandling } from "./utils/errorHandler";
const app = express();
import cors from "cors";
// db
import connection from "./db/connection";

// connection frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// routes
import todoTaskRouter from "./routes/todoTaskRouter";
import UserRouter from "./routes/userRouter";
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(errorHandling); //error handling

// db connection

connection();
app.use("/user", limiter, UserRouter);
app.use("/todo", limiter, todoTaskRouter);
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
