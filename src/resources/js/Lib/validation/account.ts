import { z } from "zod";

export const AccountSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .max(150, "Email muito longo"),

  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .optional()
    .or(z.literal("")), // permite string vazia

  password_confirmation: z
    .string()
    .optional()
    .or(z.literal("")),
}).refine(
  (data) => {
    if (!data.password && !data.password_confirmation) return true;
    return data.password === data.password_confirmation;
  },
  {
    message: "As senhas não coincidem",
    path: ["password_confirmation"],
  }
);
