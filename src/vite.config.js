import { defineConfig, loadEnv } from 'vite'; // ✅ 1. Importe o loadEnv
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => { // ✅ 2. Exporte uma função
    // ✅ 3. Carregue as variáveis de ambiente do .env
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            laravel({ input: ['resources/css/app.css', 'resources/js/app.tsx'], refresh: true }),
            react(),
            tailwindcss(),
        ],
        server: {
            host: '0.0.0.0',
            cors: true,
            hmr: {
                host: env.VITE_HMR_HOST,
            },
            watch: {
                ignored: ['**/node_modules/**', '**/vendor/**']
            }
        },
    };
});