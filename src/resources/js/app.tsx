import "../css/app.css";
import "./bootstrap";
import "leaflet/dist/leaflet.css";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthLayout from "@/Layouts/AuthLayout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        // Carrega o componente da página dinamicamente
        const page = (await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        )) as any; // Usamos 'any' temporariamente para poder adicionar a propriedade 'layout'

        const publicPages = ["Public/"];

        const isPublicPage = publicPages.some((prefix) =>
            name.startsWith(prefix)
        );

        page.default.layout = isPublicPage
            ? (pageComponent: React.ReactNode) => (
                  <GuestLayout>{pageComponent}</GuestLayout>
              )
            : (pageComponent: React.ReactNode) => (
                  <AuthLayout>{pageComponent}</AuthLayout>
              );

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
