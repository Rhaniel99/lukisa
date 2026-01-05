import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/Hooks/useAuth";
import { userNotificationChannel } from "@/Layouts/Auth/services/notificationChannel";
// import { SocialNotification } from "@/Components/Notifications/SocialNotification";

interface Payload {
  userName: string;
  avatarUrl: string;
  actionType: "like" | "comment";
}

export function useSocialNotifications() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = userNotificationChannel(user.id);

    channel.listen(".memory.notification", (payload: Payload) => {
        console.log(payload);
    //   toast.custom((t) => (
    //     <SocialNotification
    //       userName={payload.userName}
    //       avatarUrl={payload.avatarUrl}
    //       actionType={payload.actionType}
    //       message={
    //         payload.actionType === "like"
    //           ? "curtiu sua memória"
    //           : "comentou sua memória"
    //       }
    //       onClose={() => toast.dismiss(t)}
    //     />
    //   ));
    });

    return () => {
      channel.stopListening(".memory.notification");
      channel.unsubscribe();
    };
  }, [user?.id]);
}
