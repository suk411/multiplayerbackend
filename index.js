import express from "express";
import { WebSocketServer } from "ws";
import { CONFIG } from "./config.js";
import { startBetting } from "./phases.js";

const app = express();

const server = app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ message: "Connected to Dragon-Tiger server" }));
});

// Trigger betting cycle every 20s
setInterval(() => {
  startBetting(11); // 11-second betting window
}, 20000);
