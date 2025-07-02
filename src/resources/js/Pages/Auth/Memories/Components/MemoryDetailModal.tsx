import React from 'react';
import { Memory, Comment } from '@/Types/models';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddCommentForm } from './AddCommentForm';

interface MemoryDetailModalProps {
  memory: Memory | null;
  onClose: () => void;
  onLike: (memory: Memory) => void;
}

const CommentList: React.FC<{ comments: Memory['comments'] }> = ({ comments }) => (
  <div className="space-y-4">
    {comments.length > 0 ? (
      comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatar || ''} />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 rounded-lg bg-slate-50 p-2">
            <p className="text-sm">
              <span className="font-semibold text-slate-800">{comment.author.name}</span>
              <span className="ml-2 text-slate-600">{comment.text}</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">{comment.created}</p>
          </div>
        </div>
      ))
    ) : (
      <div className="py-8 text-center text-sm text-slate-500">
        Nenhum comentário ainda. Seja o primeiro!
      </div>
    )}
  </div>
);

export const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({ memory, onClose, onLike }) => {
  if (!memory) return null;

  return (
    <Dialog open={!!memory} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0" onPointerDownOutside={onClose}>
        <div className="grid h-screen max-h-[90vh] grid-cols-1 md:grid-cols-2">
          {/* Coluna da Imagem */}
          <div className="relative flex items-center justify-center bg-slate-100">
            <img src={memory.image ?? undefined} alt={memory.title} className="h-full w-full object-contain" />
          </div>

          {/* Coluna de Detalhes e Comentários */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={memory.author.avatar || ''} />
                  <AvatarFallback>{memory.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{memory.title}</h3>
                  <p className="text-sm text-slate-500">
                    por {memory.author.name} • {memory.created}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <p className="mb-4 text-slate-700">{memory.description}</p>
              <div className="mb-4 flex items-center space-x-4 border-b pb-4">
                <button onClick={() => onLike(memory)} className="flex items-center text-slate-600">
                  <Heart
                    className={`mr-1.5 h-5 w-5 cursor-pointer transition-all ${
                      memory.liked ? 'fill-red-500 text-red-500' : 'hover:text-red-400'
                    }`}
                  />
                  <span>{memory.likes}</span>
                </button>
                <div className="flex items-center text-slate-600">
                  <MessageCircle className="mr-1.5 h-5 w-5" />
                  <span>{memory.comments.length}</span>
                </div>
              </div>
              <CommentList comments={memory.comments} />
            </ScrollArea>

            <div className="border-t p-4">
              <AddCommentForm memory={memory} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
