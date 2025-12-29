import { User } from "@/Types/User";
import { MemoryComment } from "./MemoryComment";

export interface Memory {
    id: string;
    title: string;
    description: string;
    created: string;
    likes: number;
    liked: boolean;
    image: string;
    is_owner: boolean;
    author: User;

    comments: MemoryComment[];
    comments_count: number;

    comments_current_page?: number;
    comments_last_page?: number;
}

/**
 * Type guard para validar Memory vinda do Inertia / backend
 */
export function isMemory(value: unknown): value is Memory {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "title" in value &&
        "description" in value
    );
}