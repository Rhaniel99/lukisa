import { Memory } from '@/Types/Memories';
import { X, Heart, MessageCircle, MoreHorizontal, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MemoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: () => void;
  locationName?: string;
  memories: Memory[];
  onMemoryClick?: (memory: Memory) => void;
}

export function MemoryDrawer({
  isOpen,
  onClose,
  onAddMemory,
  locationName = "Local",
  memories,
  onMemoryClick
}: MemoryDrawerProps) {

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#3D2817]/20 backdrop-blur-[1px] z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#F5EFE6] shadow-2xl z-50 border-l-2 border-[#E8DCC4] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#D4C5A9] bg-[#F5EFE6] flex items-center justify-between z-10 relative shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-[#6B4E3D] text-sm mb-1">
                  <span className="w-2 h-2 bg-[#6B4E3D] rounded-full"></span>
                  <span>Memórias em</span>
                </div>
                <h2 className="text-2xl font-bold text-[#3D2817]">{locationName}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onAddMemory}
                  className="flex items-center gap-2 px-4 py-2 bg-[#E8DCC4] text-[#6B4E3D] rounded-xl hover:bg-[#D4C5A9] transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#E8DCC4] rounded-xl text-[#6B4E3D] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content (Feed) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAF7F2]">
              {memories.map((memory) => (
                <div
                  key={memory.id}
                  onClick={() => onMemoryClick && onMemoryClick(memory)}
                  className="bg-white rounded-3xl shadow-lg border border-[#E8DCC4] overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4C5A9] border-2 border-[#F5EFE6] overflow-hidden">
                        {/* <ImageWithFallback
                            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=60"
                            alt={memory.author}
                            className="w-full h-full object-cover"
                         /> */}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#3D2817] text-sm">{memory.title}</h3>
                        <p className="text-xs text-[#8B7355]">por {memory.author.username}</p>
                      </div>
                    </div>
                    <button className="text-[#D4C5A9] hover:text-[#6B4E3D]">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Image */}
                  {memory.image && (
                    <div className="aspect-video bg-[#E8DCC4] relative">
                      {/* <ImageWithFallback
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-full object-cover"
                      /> */}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-[#6B4E3D] text-sm leading-relaxed mb-4">
                      {memory.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#F5EFE6]">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-[#8B7355] hover:text-[#D4183D] transition-colors group">
                          <Heart className="w-5 h-5 group-hover:fill-current" />
                          <span className="text-xs font-medium">{memory.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-[#8B7355] hover:text-[#6B4E3D] transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-xs font-medium">{memory.comments_count}</span>
                        </button>
                      </div>
                      <span className="text-[10px] px-2 py-1 bg-[#F5EFE6] rounded-lg text-[#8B7355]">
                        {memory.created}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
