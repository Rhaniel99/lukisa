// Define os tipos para os modelos de dados que vêm do backend
export interface User {
    id: number;
    name: string;
    avatar: string | null;
}

export interface Memory {
    id: number;
    title: string;
    user: User;
}

export interface Place {
    id: number;
    latitude: number;
    longitude: number;
    memories: Memory[];
}

// Props que a página Index recebe do Laravel/ViewModel
export interface MemoriesIndexProps {
    places: Place[];
}
