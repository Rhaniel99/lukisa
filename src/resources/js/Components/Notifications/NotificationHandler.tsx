import { useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";
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
    // ? Importante para que não bug ao fazer outras requisições 
    const lastFlashRef = useRef<string>("");
    
    useEffect(() => {
        if (flash?.success?.message) {
            const key = `${flash.success.message}-${flash.success.time}`;
            if (key !== lastFlashRef.current) {
                toast.success(flash.success.message);
                lastFlashRef.current = key;
            }
        }

        if (flash?.error?.message) {
            const key = `${flash.error.message}-${flash.error.time}`;
            if (key !== lastFlashRef.current) {
                toast.error(flash.error.message);
                lastFlashRef.current = key;
            }
        }

        if (errors && Object.keys(errors).length > 0) {
            Object.values(errors).forEach((errMsg) => toast.error(errMsg));
        }
    }, [flash?.success, flash?.error, errors]);


    // --- Lógica do (Broadcast) ---
    // useEffect(() => {
    //     if (!auth?.user?.id) {
    //         return;
    //     }

    //     const channelName = `App.Models.User.${auth.user.id}`;

    //     window.Echo.private(channelName).notification(
    //         (notification: NotificationPayload) => {
    //             console.log("Notificação de broadcast recebida:", notification);
    //             toast(notification.body, {
    //                 type: notification.status || "info",
    //             });
    //         }
    //     );

    //     console.log(`Ouvindo notificações no canal: ${channelName}`);

    //     return () => {
    //         console.log(`Saindo do canal: ${channelName}`);
    //         window.Echo.leave(channelName);
    //     };
    // }, [auth?.user?.id]);

    // Renderiza o container uma única vez
    return (
        <ToastContainer
            position="bottom-right"
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
