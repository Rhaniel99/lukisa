import React, { FC, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast, Flip } from "react-toastify";
import { PageProps } from "@/Types/models"; // Verifique se o caminho está correto

// --- Tipagem ---
interface NotificationPayload {
    status: 'success' | 'error' | 'info';
    body: string;
}

declare const Echo: any;

const NotificationListener: FC = () => {
    // Pegamos o objeto 'auth' que contém o 'user' logado.
    const { auth } = usePage<PageProps>().props;


    useEffect(() => {
        // Se não houver um usuário logado, não fazemos nada.
        if (!auth.user) {
            return;
        }

        // ✅ Canal dinâmico baseado no ID do usuário autenticado.
        // Este é o canal padrão que o Laravel usa para notificações de usuário.
        const channelName = `App.Models.User.${auth.user.id}`;

        console.log(`Escutando no canal privado: ${channelName}`);
        console.log('auth', auth);

        Echo.private(channelName).notification(
            (notification: NotificationPayload) => {
                console.log("Notificação recebida:", notification);
                // Exibe o toast com base no status recebido.
                toast(notification.body, {
                    type: notification.status || 'info',
                    position: "top-right",
                    transition: Flip,
                });
            }
        );

        Echo.connector.pusher.connection.bind("connected", () => {
            console.log("Conectado ao Pusher!");
        });

        // ✅ Função de limpeza: sai do MESMO canal quando o componente é desmontado.
        return () => {
            console.log(`Saindo do canal: ${channelName}`);
            Echo.leave(channelName);
        };

    // ✅ A dependência agora é o ID do usuário.
    // O useEffect será re-executado se o usuário logado mudar.
    }, [auth.user?.id]);

    // Componente "headless", não renderiza nada na UI.
    return null;
};

export default NotificationListener;
