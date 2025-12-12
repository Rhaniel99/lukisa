import { User } from "@/Types/User";

export interface MemoryComment {
  id: number;
  text: string;
  created: string;
  author: User;
}
