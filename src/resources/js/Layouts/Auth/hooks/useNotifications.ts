import { useEffect, useState, useCallback, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/Types/models";
import { useAuth } from "@/Hooks/useAuth";
import { NotificationItem } from "@/Types/Notification";
import { notificationUserChannel } from "../services/notificationChannel";

export function useNotifications() {
    const { props } = usePage<PageProps & {
        notifications?: {
            count: number;
            list?: NotificationItem[];
        };
    }>();

    const { id: userId } = useAuth();

    const [count, setCount] = useState(props.notifications?.count || 0);
    const [list, setList] = useState<NotificationItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    /**
     * Refs para evitar stale closures no listener do Reverb
     */
    const isLoadedRef = useRef(isLoaded);
    const listRef = useRef(list);

    useEffect(() => {
        isLoadedRef.current = isLoaded;
        listRef.current = list;
    }, [isLoaded, list]);

    /**
     * Sync com Inertia
     */
    useEffect(() => {
        if (props.notifications?.count !== undefined) {
            setCount(props.notifications.count);
        }

        if (props.notifications?.list) {
            setList(props.notifications.list);
            setIsLoaded(true);
        }

        setLoading(false);
    }, [props.notifications]);

    /**
     * 🔔 Reverb
     */
    useEffect(() => {
        if (!userId) return;

        const channel = notificationUserChannel(userId);

        const handleNotification = (notification: any) => {
            // Proteção contra duplicidade
            if (listRef.current.some(n => n.id === notification.id)) {
                return;
            }

            // 1️⃣ incrementa contador
            setCount((prev: number) => prev + 1);

            // 2️⃣ adiciona à lista se já carregada
            if (isLoadedRef.current) {
                const newItem: NotificationItem = {
                    id: notification.id,
                    read_at: null,
                    created_at: "Agora mesmo",
                    data: {
                        type: notification.type,
                        message: notification.message || notification.data?.message,
                        actor_name: notification.actor_name || notification.data?.actor_name,
                        actor_avatar: notification.actor_avatar || notification.data?.actor_avatar,
                        link: notification.link || notification.data?.link,
                        memory_thumbnail:
                            notification.memory_thumbnail || notification.data?.memory_thumbnail,
                    },
                };


                setList(prev => [newItem, ...prev]);
            }
        };

        // 👂 Escuta notificações Laravel
        channel.notification(handleNotification);

        return () => {
            /**
             * IMPORTANTE:
             * - NÃO usar leave()
             * - NÃO matar o canal inteiro
             */
            channel.stopListening(
                '.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
                handleNotification
            );
        };
    }, [userId]);

    /**
     * 📥 Carregar notificações
     */
    const loadNotifications = useCallback(() => {
        if (isLoaded) return;

        setLoading(true);

        router.reload({
            data: { include: 'notifications' },
            only: ['notifications'],
            onFinish: () => setLoading(false),
        });
    }, [isLoaded]);

    /**
     * ✔️ Marcar como lida
     */
    const markAsRead = (id: string, onSuccessCallback?: () => void) => {
        // otimista
        setList((prev: NotificationItem[]) =>
            prev.map(n =>
                n.id === id ? { ...n, read_at: 'now' } : n
            )
        );
        setCount((prev: number) => Math.max(0, prev - 1));

        router.patch(route('notifications.mark-as-read', id), {}, {
            preserveScroll: true,
            preserveState: true,
            only: [],
            onSuccess: () => onSuccessCallback?.(),
        });
    };

    /**
     * ✔️ Marcar todas
     */
    const markAllAsRead = () => {
        setList(prev => prev.map(n => ({ ...n, read_at: 'now' })));
        setCount(0);

        router.post(route('notifications.mark-all-read'), {}, {
            preserveScroll: true,
            preserveState: true,
            only: [],
        });
    };

    return {
        count,
        list,
        isLoaded,
        loading,
        loadNotifications,
        markAsRead,
        markAllAsRead,
    };
}
