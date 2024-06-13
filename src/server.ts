import fjwt, { JWT } from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { version } from "../package.json";
import { authRoutes, bookRoutes, userRoutes } from "./routes/api";
import dotenv from "dotenv";
import moment from "moment-timezone";
dotenv.config();

const server: FastifyInstance = Fastify({});
moment.tz.setDefault("Asia/Jakarta");

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

function buildServer() {
  server.register(fjwt, { secret: process.env.DB_SECRET ?? "" });
  server.decorate("authenticate", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (error) {
      return res.send(error);
    }
  });

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
  server.register(bookRoutes, { prefix: "api/books" });
  server.register(authRoutes, { prefix: "auth" });

  return server;
}

export { buildServer, server };
