import { z } from "zod";

export const ProfileSchema = z.object({
  fullname: z.string().min(1, "Nome obrigatório").max(120),
  username: z.string().min(3, "Nome de usuário curto").max(30),
  media_id: z.number().nullable().optional(),
});