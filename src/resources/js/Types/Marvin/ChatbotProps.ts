import { ChatMessage } from "./ChatMessage";

export interface ChatbotProps {
    onClose: () => void;
    messages: ChatMessage[];
    status: 'online' | 'offline' | string;
    onSendMessage: (prompt: string) => void;
}
