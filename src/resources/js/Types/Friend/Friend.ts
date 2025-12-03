export interface Friend {
    id: string;
    username: string;
    discriminator: string;
    avatar_url: string;
    status: "online" | "offline" | "pending";
}