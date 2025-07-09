import { useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageProps } from "@/Types/models"; // Ajuste o caminho se necessário

// --- Tipos ---
interface FlashProps {
    success?: string;
    error?: string;
}

interface NotificationPayload {
    status: "success" | "error" | "info";
    body: string;
}

// O novo componente unificado
export default function NotificationHandler() {
    const { props } = usePage<PageProps>();
    const { flash, errors, auth } = props;

    // --- Lógica do Antigo Toast.tsx (Flash Messages) ---
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
            router.reload({
                only: [], // Não recarregar nenhum dado específico
                // preserveState: true, // Manter o estado atual
                // preserveScroll: true, // Manter posição do scroll
                replace: true, // Substituir entrada do histórico
            });
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (errors && Object.keys(errors).length > 0) {
            Object.values(errors).forEach((errMsg) => toast.error(errMsg));
        }
    }, [flash, errors]);

    // --- Lógica do Antigo ToastListener.tsx (Broadcast) ---
    useEffect(() => {
        if (!auth.user?.id) {
            return;
        }

        const channelName = `App.Models.User.${auth.user.id}`;

        window.Echo.private(channelName).notification(
            (notification: NotificationPayload) => {
                console.log("Notificação de broadcast recebida:", notification);
                toast(notification.body, {
                    type: notification.status || "info",
                });
            }
        );

        console.log(`Ouvindo notificações no canal: ${channelName}`);

        return () => {
            console.log(`Saindo do canal: ${channelName}`);
            window.Echo.leave(channelName);
        };
    }, [auth.user?.id]);

    // Renderiza o container uma única vez
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Flip}
            style={{ zIndex: 10000 }} // Garante que a notificação fique sobre o modal
        />
    );
}
