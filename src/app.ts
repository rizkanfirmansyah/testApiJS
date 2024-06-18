import { buildServer } from "./server";
import dotenv from "dotenv";
dotenv.config();

const server = buildServer();

async function main() {
  const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000;
  const host = process.env.APP_HOST ?? "0.0.0.0";
  try {
    server.listen(
      {
        port,
        host,
      },
      (err, address) => {
        if (err) {
          server.log.error(err);
          process.exit(1);
        }
        server.log.info(`Server listening at ${address}`);
        console.log(`Server listening at ${address}`);
      }
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
