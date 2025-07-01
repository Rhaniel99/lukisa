import React, { memo } from "react";
import { Memory, Place } from "@/Types/models";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, MapPin, Heart, MessageCircle, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { router } from "@inertiajs/react";

interface PinSidebarProps {
    isOpen: boolean;
    isLoading: boolean;
    memories: Memory[];
    place: Place | null;
    onClose: () => void;
    onMemorySelect: (memory: Memory) => void;
    onAddMemoryClick: (place: Place) => void; // Nova função de callback
}

// 2. Definir a função de exclusão FORA do componente de renderização para melhor organização
const handleDelete = (e: React.MouseEvent, memoryId: number) => {
    // Impede que o clique no "X" também acione o 'onMemorySelect' do Card.
    e.stopPropagation();

    if (window.confirm("Tem certeza de que deseja remover esta memória?")) {
        // Usa o nome da rota que você definiu ('memo.maps.destroy')
        router.delete(route("memo.maps.destroy", memoryId), {
            preserveScroll: true, // Mantém a posição da rolagem na sidebar
        });
    }
};

const handleLikeToggle = (memory: Memory) => {
    // Para uma UI mais rápida, podemos fazer uma atualização otimista (opcional)
    // Mas por enquanto, vamos apenas chamar a rota. O Inertia cuidará da atualização.

    if (memory.liked) {
        // Se já estiver curtido, chama a rota de 'unlike'
        router.delete(route("memories.unlike", memory.id), {
            preserveScroll: true,
        });
    } else {
        // Se não estiver curtido, chama a rota de 'like'
        router.post(route("memories.like", memory.id), {
            preserveScroll: true,
        });
    }
};

export const PinSidebar: React.FC<PinSidebarProps> = ({
    isOpen,
    isLoading,
    memories,
    place,
    onClose,
    onMemorySelect,
    onAddMemoryClick,
}) => {
    // Se não estiver aberto, não renderiza nada
    if (!isOpen || !place) {
        // Garante que temos um 'place' para trabalhar
        return null;
    }

    return (
        // Animação de entrada e saída
        <div
            className="absolute top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg z-[1000] transition-transform transform-gpu duration-300 ease-in-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0"
            data-state={isOpen ? "open" : "closed"}
        >
            <ScrollArea className="h-full">
                {/* Header da Sidebar */}
                <div className="flex sticky top-0 bg-white z-10 items-center justify-between p-4 border-b">
                    <h3 className="font-semibold text-lg flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-slate-600" />{" "}
                        Memórias
                    </h3>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAddMemoryClick(place)}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Conteúdo da Sidebar */}
                <div className="p-4 space-y-4">
                    {isLoading && (
                        <div className="text-center p-8 text-slate-500">
                            <p>Carregando memórias...</p>
                        </div>
                    )}
                    {!isLoading && memories.length === 0 && (
                        <div className="text-center p-8 text-slate-500">
                            <p>Nenhuma memória encontrada neste local.</p>
                            <p className="text-sm">
                                Seja o primeiro a criar uma!
                            </p>
                        </div>
                    )}
                    {!isLoading &&
                        memories.map((memory) => (
                            <Card
                                key={memory.id}
                                className="relative transition-shadow"
                            >
                                {/* 4. Lógica para exibir o botão "X" de exclusão */}
                                {memory.is_owner && (
                                    <button
                                        onClick={(e) =>
                                            handleDelete(e, memory.id)
                                        }
                                        className="absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-gray-200 opacity-75 transition-all hover:opacity-100 hover:bg-red-600 hover:scale-110"
                                        aria-label="Remover memória"
                                    >
                                        <X size={16} />
                                    </button>
                                )}

                                <CardHeader className="pb-3">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage
                                                src={memory.author.avatar || ""}
                                            />
                                            <AvatarFallback>
                                                {memory.author.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-base">
                                                {memory.title}
                                            </CardTitle>
                                            <CardDescription className="text-xs">
                                                por {memory.author.name}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    {memory.image && (
                                        <img
                                            src={memory.image}
                                            alt={memory.title}
                                            // ✅ Evento de clique e cursor agora estão na imagem
                                            onClick={() =>
                                                onMemorySelect(memory)
                                            }
                                            className="w-full h-32 object-cover rounded-lg mb-3 cursor-pointer"
                                        />
                                    )}
                                    <p className="text-sm text-slate-700 mb-3 line-clamp-2">
                                        {memory.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center text-xs text-slate-500">
                                                {/* ✅ Adicione o onClick aqui */}
                                                <Heart
                                                    onClick={() =>
                                                        handleLikeToggle(memory)
                                                    }
                                                    className={`w-4 h-4 mr-1 cursor-pointer transition-all ${
                                                        memory.liked
                                                            ? "fill-red-500 text-red-500"
                                                            : "text-slate-500 hover:text-red-400"
                                                    }`}
                                                />
                                                {memory.likes}
                                            </div>
                                            <div className="flex items-center text-xs text-slate-500">
                                                <MessageCircle className="w-4 h-4 mr-1 text-slate-500" />
                                                {/* Certifique-se de que a propriedade é 'commentsCount' ou 'comments.length' */}
                                                {memory.commentsCount ??
                                                    memory.comments.length}
                                            </div>
                                        </div>
                                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">
                                            {memory.created}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </ScrollArea>
        </div>
    );
};
