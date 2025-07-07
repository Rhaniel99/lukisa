import React, { useRef } from "react";
import { Memory } from "@/Types/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, X } from "lucide-react";
import { AddCommentForm } from "./AddCommentForm";
import { useCommentRealtime } from "../Hooks/useCommentRealtime";
import { useCommentPagination } from "../Hooks/useCommentPagination";

// Definindo a interface de props que o componente recebe
interface MemoryDetailModalProps {
    memory: Memory | null;
    onClose: () => void;
    onLike: (memory: Memory) => void;
}

export const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({
    memory,
    onClose,
    onLike,
}) => {
    // Se não houver memória selecionada, o componente não renderiza nada
    if (!memory) {
        return null;
    }

    const { count } = useCommentRealtime(memory);

    // extrair initial props de comentários vindos do servidor
    const {
        comments: initialComments,
        commentsCurrentPage,
        commentsLastPage,
    } = memory as any; // tipar adequadamente

    const { comments, loadMore, hasMore } = useCommentPagination({
        memory,
        initialComments,
        initialPage: commentsCurrentPage,
        lastPage: commentsLastPage,
    });


    return (
        // Fundo com overlay escuro que cobre a tela toda
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm animate-fade-in">
            <Card className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-hidden bg-white dark:bg-slate-950">
                {/* Coluna da Imagem */}
                <div className="relative flex items-center justify-center bg-slate-100 dark:bg-slate-900 md:max-h-[90vh] overflow-hidden">
                    <img
                        src={memory.image || "/placeholder.svg"}
                        alt={memory.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Coluna de Conteúdo */}
                <div className="flex flex-col h-full max-h-[90vh]">
                    <CardHeader className="flex-shrink-0">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <Avatar>
                                    <AvatarImage
                                        src={
                                            memory.author.avatar_url ||
                                            undefined
                                        }
                                    />
                                    <AvatarFallback>
                                        {memory.author.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{memory.title}</CardTitle>
                                    <CardDescription>
                                        por {memory.author.name} •{" "}
                                        {memory.created}
                                    </CardDescription>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="-mt-2 -mr-2"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardHeader>

                    {/* Área de rolagem para o conteúdo e comentários */}
                    <ScrollArea
                        className="flex-grow min-h-0"
                        // onScrollViewport={onScroll}

                        // onScroll={onScroll}
                        // ref={scrollRef}
                    >
                        <CardContent className="space-y-4 px-6 pb-6">
                            <p className="text-slate-700 dark:text-slate-300">
                                {memory.description}
                            </p>

                            <div className="flex items-center space-x-4 pt-4 border-t">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onLike(memory)}
                                    className="text-slate-600 dark:text-slate-300"
                                >
                                    <Heart
                                        className={`w-4 h-4 mr-2 transition-all ${
                                            memory.liked
                                                ? "fill-red-500 text-red-500"
                                                : "hover:text-red-500"
                                        }`}
                                    />
                                    {memory.likes}
                                </Button>
                                <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    <span>
                                        {/* ✅ Use a contagem reativa do hook */}
                                        {count} comentários
                                    </span>
                                </div>
                            </div>

                            {/* Lista de Comentários */}
                            <div className="space-y-4">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="flex items-start space-x-3"
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={
                                                        comment.author
                                                            .avatar_url ||
                                                        undefined
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {comment.author.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 rounded-lg bg-slate-50 dark:bg-slate-800 p-2">
                                                <p className="text-sm">
                                                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                                                        {comment.author.name}
                                                    </span>
                                                    <span className="ml-2 text-slate-600 dark:text-slate-300">
                                                        {comment.text}
                                                    </span>
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    {comment.created}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-4 text-center text-sm text-slate-500">
                                        Nenhum comentário ainda. Seja o
                                        primeiro!
                                    </div>
                                )}
                                {hasMore && (
                                    <div className="flex justify-center pt-4">
                                        <Button
                                            onClick={() => loadMore()}
                                            variant="outline"
                                        >
                                            Carregar mais
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </ScrollArea>

                    {/* Formulário de novo comentário no rodapé */}
                    <CardFooter className="flex-shrink-0 border-t pt-4">
                        <AddCommentForm memory={memory} />
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
};
