import { rateLimit } from "express-rate-limit";

// to prevent the dos attack
export const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "to many request try after ...",
});
