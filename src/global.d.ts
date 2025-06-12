import { Config } from 'ziggy-js';
import axios from 'axios';

declare global {
    // Declaração da função 'route' global do Ziggy
    function route(
        name: string,
        params?: any,
        absolute?: boolean,
        config?: Config
    ): string;

    // Declaração da propriedade 'axios' na interface global Window
    interface Window {
        axios: typeof axios;
    }
}

// Mantém o arquivo como um módulo TypeScript
export {};
