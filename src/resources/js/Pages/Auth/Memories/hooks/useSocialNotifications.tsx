import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/Hooks/useAuth";
import { notificationUserChannel } from "@/Layouts/Auth/services/notificationChannel";
import SocialNotification from "@/Components/Notifications/SocialNotification";

interface SocialNotificationPayload {
  type: "like" | "comment";
  actor_name: string;
  actor_avatar: string | null;
  memory_thumbnail?: string | null;
  link?: string;
}

export function useSocialNotifications() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = notificationUserChannel(user.id);

    const handleNotification = (notification: { data: SocialNotificationPayload }) => {
      const {
        type,
        actor_name,
        actor_avatar,
        memory_thumbnail,
        link,
      } = notification.data;

      toast.custom(
        (t) => (
          <SocialNotification
            userName={actor_name}
            avatarUrl={actor_avatar ?? "/images/avatar-placeholder.png"}
            actionType={type}
            memoryThumbnail={memory_thumbnail ?? undefined}
            link={link}
            message={
              type === "like"
                ? "curtiu sua memória"
                : "comentou sua memória"
            }
            onClose={() => toast.dismiss(t)}
          />
        ),
        { duration: 5000 }
      );
    };

    channel.notification(handleNotification);

    return () => {
      channel.stopListening(
        ".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
        handleNotification
      );
      channel.unsubscribe();
    };
  }, [user?.id]);
}
