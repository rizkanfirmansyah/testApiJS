import Fastify, { FastifyInstance } from "fastify";
import userRoutes from "./routes/api";
import { withRefResolver } from "fastify-zod";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { version } from "../package.json";

function buildServer() {
  const server: FastifyInstance = Fastify({});

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  const swaggerOptions = {
    openapi: {
      info: {
        title: "My Title",
        description: "My Description.",
        version,
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local development server",
        },
        {
          url: "http://localhost",
          description: "Local server",
        },
      ],
      components: {},
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  };

  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
  };

  server.register(swagger, swaggerOptions);
  server.register(swaggerUI, swaggerUiOptions);

  server.register(userRoutes, { prefix: "api/users" });

  return server;
}

export default buildServer;
