import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user } from "./schema/user";

async function seeder() {
  const sql = postgres(process.env.DB_URL ?? "postgres://postgres:password@0.0.0.0:5432/fastify", { max: 1 });
  const db = drizzle(sql);
  try {
    const data: (typeof user.$inferInsert)[] = [];
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("12345", saltRounds);

    for (let i = 0; i < 200; i++) {
      const name = faker.internet.userName() || "example";
      const email = faker.internet.email() || "example@gmail.com";

      if (i == 0) {
        data.push({
          name: "admin",
          email: "admin@gmail.com",
          password: hashedPassword,
          role: "admin",
        });
      } else {
        data.push({
          name,
          email,
          password: hashedPassword,
          role: "customer",
        });
      }
    }

    console.log("Seed start");
    await db.insert(user).values(data);
    console.log("Seed done");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

seeder();
