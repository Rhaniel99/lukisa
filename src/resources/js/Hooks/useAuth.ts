import { usePage, router } from "@inertiajs/react";
import type { PageProps } from '@/Types/Inertia/PageProps'

export function useAuth() {
    const { auth } = usePage<PageProps>().props;

    const user = auth?.user;

    const logout = () => router.post(route("auth.logout"));

    return {
        user,
        logout,
        isLoggedIn: Boolean(user),
        id: user?.id,
        avatarUrl: user?.avatar_url,
        username: user?.username,
    };
}
