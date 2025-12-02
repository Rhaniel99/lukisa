import { z } from "zod";

export const PrivacySchema = z.object({
  privacy: z.enum(["public", "friends", "private"]).default("friends"),
  allow_friend_requests: z.boolean().default(true),
});