import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.GEMINI_API_KEY ?? "";
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing. ");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(key);

export async function generateMotivationMessage(
  username: string,
  taskid: number
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Motivate ${username} for completing task ${taskid} today.`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    console.log(response);
    return response || "Keep going! You're doing great!";
  } catch (error) {
    console.error("Error generating motivation message:", error);
    return "Stay positive and keep pushing forward!";
  }
}
