import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { limiter } from "./middleware/rateLimiter"; // Prevent DoS attack
import { errorHandling } from "./utils/errorHandler";
import connection from "./db/connection";

// Routes
import todoTaskRouter from "./routes/todoTaskRouter";
import UserRouter from "./routes/userRouter";

const app = express();

// Enable trust proxy
app.set("trust proxy", 1);

// CORS Configuration (Allowing frontend connection)

app.use(
  cors({
    origin: "*", // allow all
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

// Rate limiting for security
app.use("/user", limiter, UserRouter);
app.use("/todo", limiter, todoTaskRouter);

// Test Endpoint to check server status and cookies
app.get("/test", (req: Request, res: Response) => {
  const data = Math.random().toString();
  res.cookie("test", data, {
    maxAge: 10000,
    httpOnly: true,
  });
  res.send("GET request received. Cookie set!");
});

// Error handling middleware (Always at the end)
app.use(errorHandling);

// Database connection
connection();

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
