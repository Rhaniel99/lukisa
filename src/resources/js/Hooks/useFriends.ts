import { useEffect, useState, useCallback } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { PageProps, Friend, PendingFriend } from "@/Types/models";

type ListType = "pending" | "accepted";

interface FriendRequestEvent {
    count: number;
}

export function useFriends() {
    const { props } = usePage<
        PageProps & { friendships: { count: number; pending?: PendingFriend[]; accepted?: Friend[] } }
    >();
    const authUser = props.auth.user;

    const [pending, setPending] = useState<PendingFriend[]>([]);
    const [accepted, setAccepted] = useState<Friend[]>([]);
    const [counts, setCounts] = useState<number>(props.friendships?.count || 0);
    const [loading, setLoading] = useState(false);

    const friendshipForm = useForm({});

    useEffect(() => {
        setCounts(props.friendships?.count || 0);

        if (props.friendships?.pending !== undefined) {
            setPending(props.friendships.pending);
        }

        if (props.friendships?.accepted !== undefined) {
            setAccepted(props.friendships.accepted);
        }

        setLoading(false);
    }, [props.friendships]);

    useEffect(() => {
        if (!authUser?.id) return;

        // O canal privado padrão do Laravel para notificações de usuário é 'App.Models.User.{id}'
        const channelName = `App.Models.User.${authUser.id}`;

        // Conecta ao canal privado
        const channel = window.Echo.private(channelName);

        // Escuta o evento definido no broadcastAs() -> 'friend.request.received'
        // O ponto (.) no início é importante para indicar que não estamos usando o namespace padrão do Laravel Events
        channel.listen(".friend.request.received", (e: FriendRequestEvent) => {
            // Atualiza o contador imediatamente
            setCounts(e.count);
        });

        // Limpeza ao desmontar o componente
        return () => {
            channel.stopListening(".friend.request.received");
        };
    }, [authUser?.id]);

    // A função load agora sempre dispara um router.reload
    const load = useCallback((type: ListType) => {
        setLoading(true); // Define loading como true ao iniciar a busca
        router.reload({
            data: { include: type }, // Solicita dados específicos
            only: ["friendships"], // Recarrega apenas a prop 'friendships'
            onFinish: () => setLoading(false), // Define loading como falso ao finalizar
        });
    }, []);

    const acceptFriend = (friendship_id: string) => {
        friendshipForm.patch(route("friends.accept", friendship_id), {
            preserveScroll: true,
            onSuccess: () => {
                // Remover da lista pendente localmente - o flash será mostrado pelo NotificationHandler
                const friendToAccept = pending.find((f) => f.friendship_id === friendship_id);
                if (friendToAccept) {
                    setPending((prev) => prev.filter((f) => f.friendship_id !== friendship_id));
                    setAccepted((prev) => [...prev, { id: friendToAccept.id, username: friendToAccept.username, discriminator: friendToAccept.discriminator, avatar_url: friendToAccept.avatar_url || '', status: 'offline' as const }]);
                    setCounts((prev) => Math.max(0, prev - 1));
                }
                setLoading(false);
            },
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    const rejectFriend = (id: string) => {
        friendshipForm.delete(route("friends.destroy", id), {
            preserveScroll: true,
            onSuccess: () => {
                // Remover da lista localmente - o flash será mostrado pelo NotificationHandler
                setPending((prev) => prev.filter((f) => f.friendship_id !== id));
                setCounts((prev) => Math.max(0, prev - 1));
                setLoading(false);
            },
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    const removeFriend = (friendId: string) => {
        friendshipForm.delete(route("friends.remove", friendId), {
            preserveScroll: true,
            onSuccess: () => {
                setAccepted((prev) => prev.filter((f) => f.id !== friendId));
                setLoading(false);
            },
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    const blockFriend = (friendId: string) => {
        friendshipForm.post(route("friends.block", friendId), {
            preserveScroll: true,
            onSuccess: () => {
                setAccepted((prev) => prev.filter((f) => f.id !== friendId));
                setLoading(false);
            },
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    return {
        pending,
        accepted,
        counts,
        loading,
        load,
        acceptFriend,
        rejectFriend,
        removeFriend,
        blockFriend,
    };
}
