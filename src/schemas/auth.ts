import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const signUpSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  password: z.string().min(4, "Senha deve ter pelo menos 4 caracteres")
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  password: z.string().min(8).optional().or(z.literal("")),
  role: z.enum(["admin", "user"]).optional(),
});