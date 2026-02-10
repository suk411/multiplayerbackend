import redis from "./redis.js";

let currentPhase = "STOP";
let timer = null;

export function getCurrentPhase() {
  return currentPhase;
}

export function startBetting(duration = 11) {
  currentPhase = "BETTING";
  let remaining = duration;
  broadcastPhase();

  timer = setInterval(() => {
    remaining--;
    redis.publish("game-timer", JSON.stringify({ remaining }));

    if (remaining <= 0) {
      stopBetting();
    }
  }, 1000);
}

export function stopBetting() {
  currentPhase = "STOP";
  broadcastPhase();
  clearInterval(timer);
}

function broadcastPhase() {
  const payload = {
    phase: currentPhase,
    timestamp: Date.now(),
  };
  redis.publish("game-phase", JSON.stringify(payload));
}
