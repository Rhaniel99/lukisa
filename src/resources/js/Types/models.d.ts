import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { SettingsUser } from './Settings';

export type AuthUser = {
    id: string;
    fullname: string;
    username: string;
    password: string;
    confirm_password: string;
    discriminator: string;
    email: string;
    avatar_url: string | null;
    tag?: string;
    privacy: string;
    allow_friend_requests: boolean;
};

export interface Comment {
    id: number;
    text: string;
    created: string;
    author: User;
}

// Props para a página principal
export interface MemoriesIndexProps {
    places: Place[];
}

export type FlashMessage = {
    message: string;
    time: number;
};


// ✅ Define e exporta o tipo base que todas as páginas terão
// export type PageProps = InertiaPageProps & {
//     auth: {
//         user: AuthUser;
//     };
//     flash?: {
//         success?: FlashMessage;
//         error?: FlashMessage;
//         info?: FlashMessage;
//         warning?: FlashMessage;
//     };
//     notifications?: NotificationsData;
//     settings_user?: SettingsUser; 
// };

// declare module '@inertiajs/core' {
//     export interface PageProps extends InertiaPageProps {
//         auth: {
//             user: AuthUser;
//         };
//         flash?: {
//             success?: string;
//             error?: string;
//         };
//         friendships?: FriendshipsData;
//         notifications?: NotificationsData;
//         settings_user?: SettingsUser;
//         // Adicione aqui outras props que são compartilhadas em TODAS as páginas
//     }
// }

export interface PaginatedResponse<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
        next_page_url?: string | null; // Adicione esta propriedade opcional
    };
}
