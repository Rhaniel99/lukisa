import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// ✅ ADICIONE TODA ESTA PARTE ABAIXO
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Disponibiliza o Pusher globalmente para o Echo usar
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    // forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',
    enabledTransports: ['ws'],
    // enabledTransports: ['ws', 'wss'],
    wsPath: '/app',
});
