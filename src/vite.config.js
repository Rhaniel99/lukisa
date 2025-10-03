import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
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
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    },
                },
            },
        },
    };
});