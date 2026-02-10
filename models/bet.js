import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
  playerId: String,
  choice: { type: String, enum: ["DRAGON", "TIGER", "TIE"] },
  amount: Number,
  phase: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Bet", betSchema);
