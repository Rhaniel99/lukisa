import { PaginatedResponse } from "./models";
import { PageProps } from '@inertiajs/core';
export interface Message {
    id: string;
    content: string;
    sender: "user" | "marvin";
    created_at: string;
}

export interface MarvinPageProps extends PageProps {
    history: PaginatedResponse<ConversationTurn>;
    marvinResponse?: string;
    marvinError?: string;
}

export interface ConversationTurn {
    id: string; // Geralmente o ID da pergunta
    question: Message;
    answer: Message;
}
