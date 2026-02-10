import { createClient } from "redis";
import { CONFIG } from "./config.js";

const redis = createClient({ url: CONFIG.REDIS_URL });

redis.on("error", (err) => console.error("❌ Redis error:", err));
redis.on("connect", () => console.log("✅ Redis connected"));

await redis.connect();

export default redis;
