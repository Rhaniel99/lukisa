export type NotificationItem = {
    id: string;
    read_at: string | null;
    created_at: string;
    data: {
        type: 'like' | 'comment' | 'friend_request';
        message: string;
        actor_name: string;
        actor_avatar: string;
        link?: string;
    };
};