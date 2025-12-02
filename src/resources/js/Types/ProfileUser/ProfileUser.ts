import type { MediaItem } from "@/Types/Avatar";

export interface ProfileUser {
    fullname: string;
    username: string;
    avatar_url: string | null;
    avatar_history: MediaItem[];
}
