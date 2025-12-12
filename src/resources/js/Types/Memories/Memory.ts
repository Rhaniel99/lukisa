import { User } from "@/Types/User";
import { MemoryComment } from "./MemoryComment";

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
    comments: MemoryComment[];
    comments_count: number;
    // ✅ Adicione a prop de metadados da paginação
    commentsMeta?: {
        current_page: number;
        last_page: number;
        has_more_pages: boolean;
    } | null;
}