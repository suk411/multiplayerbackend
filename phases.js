import redis from "./redis.js";

let currentPhase = "STOP";
let timer = null;
let remaining = null;
let roundId = 0;

export function getCurrentRound() {
  return {
    roundId,
    phase: currentPhase,
    remaining,
    timestamp: Date.now(),
  };
}

export function startRound(duration = 11) {
  roundId++;
  currentPhase = "BETTING";
  remaining = duration;
  broadcastRound();

  timer = setInterval(() => {
    remaining--;
    redis.set("current-timer", remaining);

    if (remaining <= 0) {
      endRound();
    } else {
      broadcastRound();
    }
  }, 1000);
}

export function endRound() {
  currentPhase = "STOP";
  remaining = null;
  broadcastRound();
  clearInterval(timer);
}

function broadcastRound() {
  const payload = getCurrentRound();
  redis.publish("game-round", JSON.stringify(payload));
}
