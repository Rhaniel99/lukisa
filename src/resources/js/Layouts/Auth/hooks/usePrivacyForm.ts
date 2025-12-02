import { useCallback, useMemo, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { useNotify } from "@/Hooks/useNotify";
import { SettingsUser } from "@/Types/Settings";
import { PrivacySchema } from "@/Lib/validation/privacy";

export function usePrivacyForm(user: SettingsUser) {
    const notify = useNotify();

    // Estado para armazenar os valores "salvos" atuais
    const [savedData, setSavedData] = useState({
        privacy: user.privacy || "friends",
        allow_friend_requests: user.allow_friend_requests ?? true,
    });

    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
    } = useForm({
        privacy: savedData.privacy,
        allow_friend_requests: savedData.allow_friend_requests,
        _method: "PATCH",
    });

    const [justSaved, setJustSaved] = useState(false);

    // Sincroniza quando o user prop muda
    useEffect(() => {
        setSavedData({
            privacy: user.privacy || "friends",
            allow_friend_requests: user.allow_friend_requests ?? true,
        });
    }, [user]);

    const interact = useCallback(() => {
        if (justSaved) setJustSaved(false);
    }, [justSaved]);

    // Verifica se há mudanças em relação aos valores salvos
    const hasChanges = useMemo(() => {
        return data.privacy !== savedData.privacy ||
            data.allow_friend_requests !== savedData.allow_friend_requests;
    }, [data, savedData]);

    const submit = useCallback(() => {
        const parsed = PrivacySchema.safeParse({
            privacy: data.privacy,
            allow_friend_requests: data.allow_friend_requests,
        });

        if (!parsed.success) {
            const formatted = parsed.error.flatten().fieldErrors;
            Object.values(formatted).flat().forEach((msg) => notify.error(msg));
            return;
        }

        post(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => {
                // Atualiza os valores salvos
                setSavedData({
                    privacy: data.privacy,
                    allow_friend_requests: data.allow_friend_requests,
                });

                setJustSaved(true);
                setTimeout(() => setJustSaved(false), 1200);
                notify.success("Preferências de privacidade salvas!");
            },
            onError: () => {
                setJustSaved(false);
            },
        });
    }, [data, post, notify, savedData]);

    return {
        data,
        setData,
        submit,
        processing,
        errors,
        recentlySuccessful,
        justSaved,
        hasChanges,
        interact,
        savedData, // Exporta se precisar
    };
}