import { createClient } from "redis";
import { CONFIG } from "./config.js";

const redis = createClient({ url: CONFIG.REDIS_URL });
await redis.connect();

export default redis;
