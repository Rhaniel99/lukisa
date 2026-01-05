import { useEffect, useRef } from "react";
import { useAuth } from "@/Hooks/useAuth";
import { memoryChannel } from "@/Pages/Auth/Memories/services/memoryChannels";

interface MemoryLikePayload {
    id: string;
    likesCount: number;
    likers: string[];
}

export function useMemoryRealtime(
    memoryIds: string[],
    applyLikeUpdate: (id: string, likes: number, liked: boolean) => void,
    applyCommentCountUpdate: (id: string, commentsCount: number) => void
) {
    const { id: currentUserId } = useAuth();
    const channelsRef = useRef<Record<string, any>>({});

    useEffect(() => {
        if (memoryIds.length === 0) return;

        const channels = channelsRef.current;

        /**
         * 🔻 Unsubscribe de canais que saíram
         */
        Object.keys(channels).forEach(id => {
            if (!memoryIds.includes(id)) {
                channels[id].stopListening(".memory.like.updated");
                channels[id].unsubscribe();
                delete channels[id];
            }
        });

        /**
         * 🔺 Subscribe nos novos canais
         */
        memoryIds.forEach(id => {
            if (channels[id]) return;

            const channel = memoryChannel(id);


            channel.listen(
                ".memory.comments.updated",
                (payload: { id: string; commentsCount: number }) => {
                    console.log("[Realtime] comments updated", payload);

                    applyCommentCountUpdate(payload.id, payload.commentsCount);
                }
            );

            channel.listen(
                ".memory.like.updated",
                (payload: MemoryLikePayload) => {
                    if (payload.id !== id) return;

                    const likedByMe = payload.likers.includes(
                        String(currentUserId)
                    );

                    applyLikeUpdate(id, payload.likesCount, likedByMe);
                }
            );

            channels[id] = channel;
        });

        /**
         * 🔥 Cleanup total
         */
        return () => {
            Object.values(channelsRef.current).forEach(channel => {
                channel.stopListening(".memory.like.updated");
                channel.unsubscribe();
            });
            channelsRef.current = {};
        };
    }, [memoryIds.join(","), currentUserId]);
}
