type BaseNotificationData = {
  message: string;
  actor_name: string;
  actor_avatar: string;
  link?: string;
};

type MemoryNotification = BaseNotificationData & {
  type: 'like' | 'comment';
  memory_thumbnail?: string | null;
};

type FriendRequestNotification = BaseNotificationData & {
  type: 'friend_request';
};

export type NotificationItem = {
  id: string;
  read_at: string | null;
  created_at: string;
  data: MemoryNotification | FriendRequestNotification;
};
