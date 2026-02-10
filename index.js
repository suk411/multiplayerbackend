import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { CONFIG } from "./config.js";
import { startRound, getCurrentRound } from "./phases.js";

const app = express();

// ✅ Allow requests from ANY origin
app.use(cors());

// REST endpoint for current round details
app.get("/api/round", (req, res) => {
  res.json(getCurrentRound());
});

const server = app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ message: "Connected to Dragon-Tiger server" }));
});

// Trigger new round every 20s
setInterval(() => {
  startRound(11);
}, 20000);
