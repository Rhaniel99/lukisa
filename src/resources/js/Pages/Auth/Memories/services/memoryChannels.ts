import { getEcho } from "@/Services/reverb.service";

/**
 * Canal público de uma Memory
 */
export function memoryChannel(memoryId: string | number) {
  return getEcho().channel(`memories.${memoryId}`);
}
