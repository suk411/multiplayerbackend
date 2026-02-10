import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  REDIS_URL: process.env.REDIS_URL,
  PORT: process.env.PORT || 5000,
};
