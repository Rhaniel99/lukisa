import React from "react";
import { X } from "lucide-react";
import { ChatbotProps } from "@/Pages/Auth/Marvin/Types/models";
import clsx from "clsx";

const Chatbot: React.FC<ChatbotProps> = ({ onClose, messages = [], status }) => {
    return (
        <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col h-[500px] w-[350px]">
                <div className="px-4 py-3 border-b dark:border-zinc-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
                            Marvin Assistente
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className={clsx(
                                "text-white text-xs px-2 py-1 rounded-full",
                                {
                                    'bg-green-500': status === 'online',
                                    'bg-red-500': status === 'offline',
                                }
                            )}>
                                {status === 'online' ? 'Online' : 'Offline'}
                            </div>
                            <button
                                onClick={onClose}
                                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2"
                    id="chatDisplay"
                >
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chat-message max-w-xs rounded-lg px-3 py-1.5 text-sm ${
                                message.role === "user"
                                    ? "self-end bg-blue-500 text-white"
                                    : "self-start bg-zinc-500 text-white"
                            }`}
                        >
                            {message.content}
                        </div>
                    ))}
                </div>

                <div className="px-3 py-2 border-t dark:border-zinc-700">
                    <div className="flex gap-2">
                        <input
                            placeholder="Digite sua mensagem..."
                            className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
                            id="chatInput"
                            type="text"
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
                            id="sendButton"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
