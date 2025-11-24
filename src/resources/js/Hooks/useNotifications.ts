import { useEffect, useState, useCallback, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import { PageProps, NotificationItem } from "@/Types/models";

export function useNotifications() {
    const { props } = usePage<PageProps & { 
        notifications?: { 
            count: number; 
            list?: NotificationItem[] 
        } 
    }>();
    
    const authUser = props.auth.user;

    const [count, setCount] = useState(props.notifications?.count || 0);
    const [list, setList] = useState<NotificationItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    // Refs para acessar o estado atual dentro do listener do Echo sem recriar o useEffect
    const isLoadedRef = useRef(isLoaded);
    const listRef = useRef(list);
    
    // Atualiza as refs sempre que o estado mudar
    useEffect(() => {
        isLoadedRef.current = isLoaded;
        listRef.current = list;
    }, [isLoaded, list]);

    // Sincroniza com Inertia
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

    // --- INTEGRAÇÃO REVERB ---
    useEffect(() => {
        if (!authUser?.id) return;

        const channelName = `App.Models.User.${authUser.id}`;
        const channel = window.Echo.private(channelName);

        const handleNotification = (notification: any) => {
            // console.log("🔔 Notificação Hook:", notification);

            // Proteção contra duplicidade: Verifica se já temos essa notificação na lista
            const alreadyExists = listRef.current.some(n => n.id === notification.id);
            if (alreadyExists) return;

            // 1. Incrementa contador
            setCount((prev) => prev + 1);

            // 2. Adiciona à lista SE ela já estiver carregada (usando a Ref)
            if (isLoadedRef.current) {
                const newItem: NotificationItem = {
                    id: notification.id,
                    read_at: null,
                    created_at: "Agora mesmo",
                    // Mapeamento correto dos dados que vêm do Reverb
                    data: {
                        type: notification.type, // O Laravel envia direto na raiz ou em data dependendo da config, ajuste se necessário
                        message: notification.message || notification.data?.message,
                        actor_name: notification.actor_name || notification.data?.actor_name,
                        actor_avatar: notification.actor_avatar || notification.data?.actor_avatar,
                        link: notification.link || notification.data?.link
                    }
                };
                
                setList((prev) => [newItem, ...prev]);
            }
        };

        // Escuta
        channel.notification(handleNotification);

        return () => {
            // IMPORTANTE: Usar stopListening em vez de leave
            // Isso remove apenas este callback, mantendo o canal vivo para o NotificationHandler
            channel.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', handleNotification);
             // Se o stopListening genérico não funcionar, tente remover o listener específico se souber o evento exato, 
             // ou apenas não chame o leave() aqui se o NotificationHandler for o "dono" do canal.
        };
    }, [authUser?.id]); // Dependências mínimas para rodar apenas uma vez


    // ... Restante das funções (loadNotifications, markAsRead, etc - sem alterações) ...
    const loadNotifications = useCallback(() => {
        if (isLoaded) return;

        setLoading(true);
        router.reload({
            data: { include: 'notifications' },
            only: ['notifications'],
            onFinish: () => setLoading(false),
        });
    }, [isLoaded]);

const markAsRead = (id: string, onSuccessCallback?: () => void) => {
    // 1. Atualização Otimista
    setList(prev => prev.map(n => n.id === id ? { ...n, read_at: 'now' } : n));
    setCount(prev => Math.max(0, prev - 1));

    // 2. Envio Silencioso - ✅ Nome da rota corrigido
    router.patch(route('notifications.mark-as-read', id), {}, { 
        preserveScroll: true,
        preserveState: true,
        only: [],
        onSuccess: () => {
            console.log("Notificação marcada como lida no servidor.");
            // Executa o callback se ele for fornecido
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: () => {
            console.error("Erro ao marcar como lida.");
        }
    });
};



const markAllAsRead = () => {
        setList(prev => prev.map(n => ({ ...n, read_at: 'now' })));
        setCount(0);
        router.post(route('notifications.mark-all-read'), {}, { 
            preserveScroll: true,
            preserveState: true,
            only: [] // Não recarrega nada
        });
    };

    return { count, list, isLoaded, loading, loadNotifications, markAsRead, markAllAsRead };
}