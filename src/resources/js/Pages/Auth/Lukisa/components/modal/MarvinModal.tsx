import { useEffect, useRef } from "react";
import { X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "@/Pages/Auth/Marvin/Types/models";

interface MarvinModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  status: string; // online/offline
  onSendMessage: (prompt: string) => void;
}

export function MarvinModal({
  isOpen,
  onClose,
  messages,
  status,
  onSendMessage,
}: MarvinModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    const value = inputRef.current?.value || "";
    if (!value.trim()) return;

    onSendMessage(value);
    inputRef.current!.value = "";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 w-96 h-[500px] bg-[#F5EFE6] rounded-2xl shadow-2xl border-2 border-[#E8DCC4] flex flex-col z-50 overflow-hidden font-sans"
        >
          {/* HEADER */}
          <div className="bg-[#E8DCC4]/50 p-4 border-b border-[#D4C5A9] flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6B4E3D] rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-[#F5EFE6]" />
              </div>
              <div>
                <h3 className="font-bold text-[#3D2817]">Marvin</h3>

                {/* STATUS REAL */}
                <span className="text-xs text-[#6B4E3D] flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status === "online" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  {status === "online" ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-[#6B4E3D] hover:text-[#3D2817]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7F2]">
            {messages.map((m) => {
              const isUser = m.role === "user";
              const isThinking = m.role === "assistant-thinking";

              return (
                <div
                  key={m.id}
                  className={`flex ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                      ${
                        isThinking
                          ? "bg-[#E8DCC4] text-[#6B4E3D] italic opacity-70"
                          : isUser
                          ? "bg-[#6B4E3D] text-[#F5EFE6] rounded-tr-none"
                          : "bg-[#E8DCC4] text-[#3D2817] rounded-tl-none"
                      }
                    `}
                  >
                    {isThinking ? (
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-[#6B4E3D] rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-[#6B4E3D] rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-[#6B4E3D] rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.4,
                          }}
                        />
                      </div>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={endRef} />
          </div>

          {/* INPUT */}
          <div className="p-4 bg-[#F5EFE6] border-t border-[#E8DCC4]">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Digite sua mensagem..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="w-full pl-4 pr-12 py-3 bg-white border border-[#D4C5A9] rounded-xl focus:outline-none focus:border-[#6B4E3D] text-[#3D2817] placeholder:text-[#A69580] shadow-sm"
              />

              <button
                onClick={handleSend}
                className="absolute right-2 p-2 bg-[#6B4E3D] text-[#F5EFE6] rounded-lg hover:bg-[#3D2817] transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
