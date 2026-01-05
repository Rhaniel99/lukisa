import { getEcho } from "@/Services/reverb.service";

export function notificationUserChannel(userId: number | string) {
  return getEcho().private(`App.Models.User.${userId}`)
}
