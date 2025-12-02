import { usePage, router } from "@inertiajs/react";

export function useAuth() {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const logout = () => router.post(route("auth.logout"));

    return {
        user,
        logout,
        isLoggedIn: Boolean(user),
        id: user?.id,
        username: user?.username,
    };
}
