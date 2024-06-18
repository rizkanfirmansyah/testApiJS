import fjwt, { JWT } from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { version } from "../package.json";
import { authRoutes, bookRoutes, categoryRoutes, genreRoutes, userRoutes } from "./routes/api";
import dotenv from "dotenv";
import moment from "moment-timezone";
import ResponseJSON from "./utils/response";
dotenv.config();

const server: FastifyInstance = Fastify({});
moment.tz.setDefault("Asia/Jakarta");

// JWT Token Blacklist
const tokenBlacklist = new Set<string>();

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
      const token = req.headers.authorization?.split(" ")[1];
      if (token && tokenBlacklist.has(token)) {
        throw new Error("Token is blacklisted");
      }
    } catch (error) {
      ResponseJSON({ data: null, message: "Error", error: "User is Unauthorized", status: 403, res });
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
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "Enter the Bearer token in the format **Bearer <token>**",
        },
      },
    },
  };

  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
  };

  server.register(swagger, swaggerOptions);
  server.register(swaggerUI, swaggerUiOptions);

  server.get("/", async function (req: FastifyRequest, res: FastifyReply) {
    res.send("OPEN API Versi " + version);
  });

  server.register(userRoutes, { prefix: "api/users" });
  server.register(bookRoutes, { prefix: "api/books" });
  server.register(categoryRoutes, { prefix: "api/categories" });
  server.register(genreRoutes, { prefix: "api/genres" });
  server.register(authRoutes, { prefix: "auth" });

  return server;
}

export { buildServer, server, tokenBlacklist };
