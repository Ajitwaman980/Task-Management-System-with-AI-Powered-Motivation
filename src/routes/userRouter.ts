import express from "express";
const router = express.Router();
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthVerify from "../middleware/auth";
router.post("/new", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check email alredy
    const AlredyUser = await prisma.user.findFirst({
      where: { email: email },
    });
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
    // jwt token
    if (!process.env.JWT_PRIVATE_KEY) {
      throw new Error("someting went wrong");
    }
    const token = await jwt.sign(new_data, process.env.JWT_PRIVATE_KEY);
    // cookies set
    res.cookie("token", token);
    res.status(200).json({ message: "New user created sucessfully", new_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking user present or not
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // password matching
    const passwordMatching = await bcrypt.compare(password, user.password);

    if (!passwordMatching) {
      res.status(401).json({ message: "Invalid password" });
    }
    if (!process.env.JWT_PRIVATE_KEY) {
      throw new Error("someting went wrong");
    }
    // token generator
    const token = await jwt.sign(user, process.env.JWT_PRIVATE_KEY);
    // cookies set
    res.cookie("token", token);
    // sending the response
    res.status(200).json({ message: "user login sucessfully", user });
  } catch (err) {
    res.status(400).json({ err: "something wrong when user login " });
  }
});

// logout

router.get("/logout", AuthVerify, async (req, res) => {
  try {
    res.cookie("token", "user not found");
    res.status(201).json({ message: "user logout sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "something went wrong when user logout" });
  }
});

export default router;
