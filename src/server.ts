import Fastify, { FastifyInstance } from "fastify";
import userRoutes from "./routes/api";

function buildServer() {
  const server: FastifyInstance = Fastify({});

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  server.register(userRoutes, { prefix: "api/users" });

  return server;
}

export default buildServer;
