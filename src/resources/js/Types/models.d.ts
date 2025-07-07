import { PageProps as InertiaPageProps } from '@inertiajs/core';

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
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    avatar_url: string | null;
};

// ✅ Define e exporta o tipo base que todas as páginas terão
export type PageProps = InertiaPageProps & {
    auth: {
        user: User;
    };
    // Adicione outras props globais aqui, como 'flash'
    flash?: {
        success?: string;
        error?: string;
    }
};

// Mantém a declaração de módulo para o Inertia
declare module '@inertiajs/core' {
  interface PageProps extends PageProps {}
}
