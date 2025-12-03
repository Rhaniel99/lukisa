export type PendingFriend = {
    id: string;
    friendship_id: string;
    username: string;
    discriminator: string;
    avatar_url: string | null;
};