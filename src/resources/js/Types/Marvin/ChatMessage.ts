export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'assistant-thinking';
    content: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}