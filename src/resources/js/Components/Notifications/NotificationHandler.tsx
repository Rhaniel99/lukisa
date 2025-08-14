import { useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageProps } from "@/Types/models";

interface NotificationPayload {
    status: "success" | "error" | "info";
    body: string;
}

export default function NotificationHandler() {
    const { props } = usePage<PageProps>();
    const { flash, errors, auth } = props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (errors && Object.keys(errors).length > 0) {
            Object.values(errors).forEach((errMsg) => toast.error(errMsg));
        }

        if (flash?.success || flash?.error) {
            router.reload({
                only: [], // Não recarregar nenhum dado específico
                replace: true, // Substituir entrada do histórico
            });
        }
    }, [flash, errors]);

    // --- Lógica do (Broadcast) ---
    useEffect(() => {
        if (!auth?.user?.id) {
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
    }, [auth?.user?.id]);

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
