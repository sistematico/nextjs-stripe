"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signInSchema, signUpSchema } from "@/schemas/auth";
import { comparePasswords, generateSalt, hashPassword } from "@/lib/password";
import { createUserSession, removeUserFromSession } from "@/lib/session";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) return "Não foi possível fazer login";

  const user = await db.query.users.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(users.email, data.email),
  });

  if (!user) return "E-mail e/ou senha inválidos";

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "E-mail e/ou senha inválidos";
  await createUserSession(user, await cookies());
  redirect("/");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);
  if (!success) return "Não foi possível criar a conta";

  const existingUser = await db.query.users.findFirst({ where: eq(users.email, data.email) });
  if (existingUser) return "Já existe uma conta com este e-mail";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const [user] = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: users.id, role: users.role });

    if (user == null) return "Não foi possível criar a conta";
    await createUserSession(user, await cookies());
  } catch (error) {
    console.error("Error creating user:", error);
    return "Não foi possível criar a conta";
  }

  redirect("/");
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}