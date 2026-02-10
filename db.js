import mongoose from "mongoose";
import { CONFIG } from "./config.js";

mongoose
  .connect(CONFIG.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default mongoose;
