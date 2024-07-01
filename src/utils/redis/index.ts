import { promisify } from "util";
import { FastifyInstance } from "fastify";
import fastifyRedis from "@fastify/redis";
import { server } from "../../server";

export function setupRedis(server: FastifyInstance) {
  server
    .register(fastifyRedis, {
      host: process.env.REDIS_HOST ?? "127.0.0.1",
      port: Number(process.env.REDIS_PORT) ?? 6379,
      username: process.env.REDIS_USERNAME ?? "user",
      password: process.env.REDIS_PASSWORD ?? "password",
    })
    .after((err) => {
      if (err) {
        server.log.error("Redis connection error:", err);
      }
    });
}

export const getDataRedis = async (key: string) => {
  const { redis } = server;
  if (redis) {
    const redisGetAsync = promisify(redis.get).bind(redis);
    let data = await redisGetAsync(key);
    return data;
  }
  return null;
};

export const setDataRedis = async (data: any, key: string) => {
  const { redis } = server;

  if (redis) {
    const redisSetAsync = promisify(redis.set).bind(redis);
    await redisSetAsync(key, JSON.stringify(data), "EX", 3600);
  }

  return data;
};
