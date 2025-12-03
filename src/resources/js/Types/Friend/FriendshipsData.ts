import { PendingFriend } from "./PendingFriend";

export type FriendshipsData = {
    pending: PendingFriend[];
    count: number;
} | null;