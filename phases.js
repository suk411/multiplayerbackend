import redis from "./redis.js";

let currentPhase = "STOP";
let timer = null;

export function startBetting(duration = 11) {
  currentPhase = "BETTING";
  broadcastPhase();

  timer = setTimeout(() => {
    stopBetting();
  }, duration * 1000);
}

export function stopBetting() {
  currentPhase = "STOP";
  broadcastPhase();
  clearTimeout(timer);
}

function broadcastPhase() {
  const payload = {
    phase: currentPhase,
    timestamp: Date.now(),
  };
  redis.publish("game-phase", JSON.stringify(payload));
}
