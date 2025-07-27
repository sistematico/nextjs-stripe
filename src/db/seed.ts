import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "./schema";
import { generateSalt, hashPassword } from "@/lib/password";

async function main() {
  await db.delete(users).where(eq(users.email, "lsbrum@icloud.com"));
  
  const salt = generateSalt();
  const password = await hashPassword("password", salt);
  
  const user: typeof users.$inferInsert = {
    name: "Lucas Saliés Brum",
    username: "lsbrum",
    email: "lsbrum@icloud.com",
    password,
    salt,
    role: "admin",
  };

  await db.insert(users).values(user);
}

main();