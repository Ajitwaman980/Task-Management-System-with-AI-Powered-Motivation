import express from "express";
const router = express.Router();
import "dotenv/config";
import bcrypt from "bcrypt";
import AuthVerify from "../middleware/auth";
import { TokenGenerator } from "../service/Token";
import { findbyEmail } from "../service/UserService";
import prisma from "../utils/prismaClient";

router.get("/check-login", AuthVerify, (req, res, next) => {
  try {
    const user = (req as any).user;
    res.status(200).json({ cookies: req.cookies, user });
  } catch (error) {
    next(error);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // check email alredy
    const AlredyUser = await findbyEmail(email);
    //   exiting
    if (AlredyUser) {
      res.status(400).json({ message: "User already exists" });
    }

    // hashpassword
    const haspassword = await bcrypt.hashSync(password, 10);
    const new_data = await prisma.user.create({
      data: {
        name,
        email,
        password: haspassword,
      },
    });
    // token
    const token = await TokenGenerator(new_data);
    // cookies set
    res.cookie("token", token);
    res.status(200).json({ message: "New user created sucessfully", new_data });
  } catch (err) {
    next(err);
  }
});

// login

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // checking user present or not
    const user = await findbyEmail(email);
    // if user not find
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // password matching
    const passwordMatching = await bcrypt.compare(password, user.password);

    if (!passwordMatching) {
      res.status(401).json({ message: "Invalid password" });
    }
    // token
    const token = await TokenGenerator(user);
    // cookies set
    res.cookie("token", token);
    // sending the response
    res.status(200).json({ message: "user login sucessfully", user });
  } catch (err) {
    next(err);
  }
});

// logout

router.get("/logout", AuthVerify, async (req, res, next) => {
  try {
    // res.cookie("token", "user not found");
    res.clearCookie("token");
    res.status(201).json({ message: "user logout sucessfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
