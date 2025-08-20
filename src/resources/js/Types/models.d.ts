import { PageProps as InertiaPageProps } from '@inertiajs/core';

export type AuthUser = {
    id: string;
    fullname: string;
    username: string;
    email: string;
    avatar_url: string | null;
};

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number;
    text: string;
    created: string;
    author: User;
}

export interface Memory {
    id: number;
    title: string;
    description: string;
    created: string;
    likes: number;
    liked: boolean;
    image: string | null;
    is_owner: boolean;
    author: User;
    // ✅ Atualize aqui para usar o novo nome
    comments: MemoryComment[];
    comments_count: number;
    // ✅ Adicione a prop de metadados da paginação
    commentsMeta?: {
        current_page: number;
        last_page: number;
        has_more_pages: boolean;
    } | null;
}

// O Place que vem do ViewModel é mais simples
export interface Place {
    id: number;
    latitude: number;
    longitude: number;
}

// Props para a página principal
export interface MemoriesIndexProps {
    places: Place[];
}

export type User = {
    id: string;
    fullname: string;
    username: string;
    email: string;
    avatar: string | null;
    avatar_url: string | null;
};

// ✅ Define e exporta o tipo base que todas as páginas terão
export type PageProps = InertiaPageProps & {
    auth: {
        user: AuthUser;
    };
    settings_user?: SettingsUser;
    flash?: {
        success?: string;
        error?: string;
    }
};

declare module '@inertiajs/core' {
  export interface PageProps extends InertiaPageProps {
    auth: {
      user: AuthUser;
    };
    flash?: {
      success?: string;
      error?: string;
    };
    // Adicione aqui outras props que são compartilhadas em TODAS as páginas
  }
}

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
