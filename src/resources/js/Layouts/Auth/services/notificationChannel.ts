import { getEcho } from "@/Services/reverb.service";

export function notificationUserChannel(userId: number | string) {
  return getEcho().private(`App.Models.User.${userId}`)
}

export function userNotificationChannel(userId: string) {
  return getEcho().private(`user.notifications.${userId}`);
}