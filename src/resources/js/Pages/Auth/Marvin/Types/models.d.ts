export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface ChatbotProps {
    onClose: () => void;
    messages: ChatMessage[];
    status: 'online' | 'offline' | string;
}
