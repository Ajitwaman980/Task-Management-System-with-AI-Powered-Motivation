import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
const AuthVerify = (req: Request, res: Response, next: NextFunction) => {
  // check cookies
  const token = req.cookies.token;

  if (!token) {
    console.log(token);
    res.status(404).json({ error: "user not autho" });
    return;
  } // jwt token
  if (!process.env.JWT_PRIVATE_KEY) {
    throw new Error("someting went wrong");
  }
  const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (!decode) {
    res.json("verify failed");
    return;
  }
  (req as any).user = decode;
  next();
};

export default AuthVerify;
