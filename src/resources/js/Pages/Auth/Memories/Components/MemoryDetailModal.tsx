import React, { useState, useEffect } from "react";
import { Memory } from "@/Types/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Heart, MessageCircle, X } from "lucide-react";
import { AddCommentForm } from "./AddCommentForm";
import { useComments } from "../Hooks/useComments";

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
    const { comments, count, loadMore, hasMore, loading } = useComments({
        memory,
    });

    // Estado para controlar a animação de saída
    const [isClosing, setIsClosing] = useState(false);

    // Efeito para lidar com a tecla 'Escape'
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Função que inicia a animação de fechamento
    const handleClose = () => {
        setIsClosing(true);
    };

    // Função chamada no final da animação para realmente fechar o modal
    const handleAnimationEnd = () => {
        if (isClosing) {
            onClose();
        }
    };

    if (!memory) {
        return null;
    }

    // Determina as classes de animação com base no estado
    const animationClass = isClosing ? "animate-fade-out" : "animate-fade-in";

    return (
        <div
            className={`fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm ${animationClass}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <Card className="grid h-[65vh] w-full max-w-4xl grid-cols-1 grid-rows-[auto_1fr] overflow-hidden bg-white dark:bg-slate-950 md:grid-cols-2 md:grid-rows-1">
                {/* Coluna da Imagem */}
                <div className="relative h-80 overflow-hidden bg-slate-100 dark:bg-slate-900 md:h-auto">
                    <img
                        src={memory.image || "/placeholder.svg"}
                        alt={memory.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>

                {/* Coluna de Conteúdo */}
                <div className="flex flex-col min-h-0">
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
                                onClick={handleClose} // <-- Usa a nova função
                                className="-mt-2 -mr-2"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardHeader>

                    <ScrollArea className="flex-grow min-h-0">
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
                                    <span>{count} comentários</span>
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
                                            onClick={loadMore}
                                            variant="outline"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Carregando..."
                                                : "Carregar mais"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </ScrollArea>

                    <CardFooter className="flex-shrink-0 border-t pt-4">
                        <AddCommentForm memory={memory} />
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
};
