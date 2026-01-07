export interface User {
    id: string;
    fullname: string;
    username: string;
    password: string;
    confirm_password: string;
    discriminator: string;
    email: string;
    avatar_url?: string;
    tag?: string;
    privacy: string;
    allow_friend_requests: boolean;
}