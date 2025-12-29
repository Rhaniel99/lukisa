import { X, Heart, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { FallbackImage } from "@/Components/ui/FallbackImage";
import { Memory } from "@/Types/Memories";
import { useMemoryComments } from "@/Pages/Auth/Memories/hooks/useMemoryComment";
import { CommentForm } from "@/Pages/Auth/Memories/components/form/CommentForm";
import { useMemoryLayout } from "@/Pages/Auth/Memories/hooks/useMemoryModalLayout";
import { useState } from "react";

interface MemoryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // memory: Memory;
  memory: Memory | null;
  onLike: (memory: Memory) => void;
  onUpdateMemory: (memory: Memory) => void;
}

export function MemoryDetailsModal({ isOpen, onClose, memory, onLike, onUpdateMemory }: MemoryDetailsModalProps) {
  const { comments, hasMore, loadMore, loading } =
    useMemoryComments(memory);
  
    // const layout = useMemoryLayout(memory.image);
    const layout = useMemoryLayout(memory?.image ?? "");

  const [fit, setFit] = useState<'cover' | 'contain'>('contain');

  if (!memory) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#3D2817]/60 backdrop-blur-sm">

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#F5EFE6] rounded-3xl shadow-2xl w-full max-w-5xl h-[620px] overflow-hidden flex flex-col md:flex-row relative border border-[#E8DCC4]"
          >

            {/* Left — Image */}
            <div className="relative w-full md:w-1/2 h-full bg-[#D4C5A9]">

              {/* Image controls */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <button
                  onClick={() => setFit(fit === 'contain' ? 'cover' : 'contain')}
                  className="
                      p-2 rounded-xl
                      bg-black/30 backdrop-blur-sm
                      text-white
                      hover:bg-black/40
                      transition
                  "
                  title="Ajustar imagem"
                >
                  <span className="text-xs font-semibold">
                    {fit === 'contain' ? 'Ajustar' : 'Encaixar'}
                  </span>
                </button>
              </div>

              {/* Image */}
              <FallbackImage
                src={memory.image ?? ''}
                alt={memory.title}
                className={`w-full h-full object-${fit}`}
              />

              {/* Mobile close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/25 backdrop-blur-sm rounded-full text-white md:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>


            {/* Right — content */}
            <div className="w-full md:w-1/2 flex flex-col h-full bg-[#F5EFE6]">

              {/* Header */}
              <div className="p-6 flex items-start justify-between border-b border-[#E8DCC4]">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-[#E8DCC4]">
                    <AvatarImage src={memory.author.avatar_url} />
                    <AvatarFallback>{memory.author.username.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-bold text-[#3D2817] text-lg leading-tight">
                      {memory.title}
                    </h3>
                    <p className="text-xs text-[#8B7355]">
                      por <span className="font-semibold">{memory.author.username}</span> • {memory.created}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="hidden md:block p-2 hover:bg-[#E8DCC4] rounded-xl text-[#6B4E3D]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* Description */}
                <p className="text-[#6B4E3D] leading-relaxed whitespace-pre-wrap">
                  {memory.description}
                </p>

                {/* Like */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#E8DCC4]">
                  <button
                    onClick={() => onLike(memory)}
                    className="group flex items-center gap-2 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 transition-all ${
                        // Usa o estado REAL da memória
                        memory.liked
                          ? "fill-[#D4183D] text-[#D4183D]"
                          : "text-[#8B7355] group-hover:text-[#D4183D]"
                        }`}
                    />
                  </button>

                  <span className="text-xs text-[#8B7355]">
                    {/* Usa a contagem REAL da memória */}
                    {memory.likes} curtidas
                  </span>
                </div>

                {/* Comments */}
                <div className="space-y-4 pt-4 border-t border-[#E8DCC4]">
                  <h4 className="text-sm font-bold text-[#3D2817]">
                    Comentários ({memory.comments_count})
                  </h4>

                  {comments.length > 0 ? (
                    <>
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex gap-3"
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={comment.author?.avatar_url}
                            />
                            <AvatarFallback className="text-xs">
                              {comment.author?.username?.[0] ??
                                "?"}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 bg-white/50 p-3 rounded-xl border border-[#E8DCC4]">
                            <div className="flex justify-between text-xs">
                              <span className="font-bold text-[#3D2817]">
                                {comment.author?.username}
                              </span>
                              <span className="text-[#8B7355]">
                                {comment.created}
                              </span>
                            </div>
                            <p className="text-sm text-[#6B4E3D]">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      {hasMore && (
                        <div className="flex justify-center pt-2">
                          <button
                            onClick={loadMore}
                            disabled={loading}
                            className="
                              px-4 py-2 text-xs font-semibold
                              text-[#6B4E3D]
                              bg-[#F5EFE6]
                              border border-[#D4C5A9]
                              rounded-full
                              hover:bg-[#E8DCC4]
                              disabled:opacity-50
                            "
                          >
                            {loading
                              ? "Carregando..."
                              : "Carregar mais comentários"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-[#8B7355] text-center py-4">
                      Nenhum comentário ainda. Seja o primeiro!
                    </p>
                  )}
                </div>
              </div>

              {/* Footer — comment input */}
              <div className="p-4 border-t border-[#E8DCC4] bg-[#FAF7F2]">
                <CommentForm
                  memoryId={memory.id}
                  onUpdateMemory={onUpdateMemory}
                />
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
