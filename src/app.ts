import { buildServer } from "./server";

const server = buildServer();

async function main() {
  try {
    server.listen(
      {
        port: 3000,
        host: "0.0.0.0",
      },
      (err, address) => {
        if (err) {
          server.log.error(err);
          process.exit(1);
        }
        server.log.info(`Server listening at ${address}`);
      }
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
