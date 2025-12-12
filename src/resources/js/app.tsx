import "../css/app.css";
import "./bootstrap";
import './echo';
import "leaflet/dist/leaflet.css";
import { createInertiaApp } from "@inertiajs/react";
import { setupLeafletIcons } from "./config/leaflet";

setupLeafletIcons();
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthLayout from "@/Layouts/Auth/Index";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = (await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        )) as any;

        const publicPages = ["Public/"];

        const fullscreenPages = ["Auth/Memories/"];

        const isPublic = publicPages.some(prefix => name.startsWith(prefix));

        // Agora: "Auth/Memories/Index".startsWith("Auth/Memories/") será TRUE
        const isFullscreen = fullscreenPages.some(prefix => name.startsWith(prefix));

        if (isPublic) {
            page.default.layout = (p: React.ReactNode) => <GuestLayout>{p}</GuestLayout>;
        } else if (isFullscreen) {
            const { default: FullscreenLayout } = await import("@/Layouts/FullscreenLayout");
            page.default.layout = (p: React.ReactNode) => <FullscreenLayout>{p}</FullscreenLayout>;
        } else {
            page.default.layout = (p: React.ReactNode) => <AuthLayout>{p}</AuthLayout>;
        }

        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
