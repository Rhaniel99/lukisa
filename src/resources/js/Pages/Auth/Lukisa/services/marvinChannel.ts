import { getEcho } from "@/Services/reverb.service";

export function marvinUserChannel(userId: number | string) {
  return getEcho().private(`marvin.user.${userId}`)
}