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
import MemoriesLayout from "@/Layouts/Memories/Index";
import PhamaniLayout from "@/Layouts/Phamani/Index";


const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = (await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        )) as any;

        if (!page.default.layout) {
            switch (true) {
                case name.startsWith("Public/"):
                    page.default.layout = (pageEl: React.ReactNode) => (
                        <GuestLayout>{pageEl}</GuestLayout>
                    );
                    break;

                case name.startsWith("Auth/Memories/"):
                    page.default.layout = (pageEl: React.ReactNode) => (
                        <MemoriesLayout>{pageEl}</MemoriesLayout>
                    );
                    break;

                case name.startsWith("Auth/Phamani/"):
                    page.default.layout = (pageEl: React.ReactNode) => (
                        <PhamaniLayout>{pageEl}</PhamaniLayout>
                    );
                    break;
                default:
                    page.default.layout = (pageEl: React.ReactNode) => (
                        <AuthLayout>{pageEl}</AuthLayout>
                    );
            }
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
