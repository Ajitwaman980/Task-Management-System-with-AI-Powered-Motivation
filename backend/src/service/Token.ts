import jwt from "jsonwebtoken";

export async function TokenGenerator(payload: any) {
  if (!process.env.JWT_PRIVATE_KEY) {
    throw new Error("someting went wrong");
  }
  const token = await jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1hr",
  });
  return token;
}
