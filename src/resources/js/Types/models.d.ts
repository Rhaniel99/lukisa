import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface Comment {
    id: number;
    text: string;
    createdAt: string;
    author: User;
}

export interface Memory {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    likes: number;
    liked: boolean;
    image: string | null;
    author: User;
    comments: Comment[]; // A coleção de comentários já virá aqui
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
