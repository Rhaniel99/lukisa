export interface SettingsAvatarHistoryItem {
    id: number;
    url: string;
}

export interface SettingsUser {
    id: number;
    fullname: string;
    username: string;
    email?: string;
    avatar_url: string | null;
    discriminator?: string;

    avatar_history: SettingsAvatarHistoryItem[];

    privacy?: "public" | "friends" | "private";
    allow_friend_requests?: boolean;
}
