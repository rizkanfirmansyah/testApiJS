import { RedisClientType } from "redis";
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { RedisClientOptions } from "redis";

declare module "fastify" {
  interface FastifyInstance {
    redis: RedisClientType;
  }
}

interface FastifyRedisOptions extends RedisClientOptions {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

const fastifyRedis: FastifyPluginCallback<FastifyRedisOptions>;

export default fastifyRedis;
