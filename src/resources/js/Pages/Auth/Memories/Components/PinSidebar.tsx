import React, { memo } from 'react';
import { Memory, Place } from '@/Types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { X, MapPin, Heart, MessageCircle, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PinSidebarProps {
    isOpen: boolean;
    isLoading: boolean;
    memories: Memory[];
    place: Place | null;
    onClose: () => void;
    onMemorySelect: (memory: Memory) => void;
    onAddMemoryClick: (place: Place) => void; // Nova função de callback
}

export const PinSidebar: React.FC<PinSidebarProps> = ({ isOpen, isLoading, memories, place, onClose, onMemorySelect, onAddMemoryClick }) => {
    // Se não estiver aberto, não renderiza nada
    if (!isOpen || !place) { // Garante que temos um 'place' para trabalhar
        return null;
    }

    return (
        // Animação de entrada e saída
        <div className="absolute top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg z-[1000] transition-transform transform-gpu duration-300 ease-in-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0" data-state={isOpen ? 'open' : 'closed'}>
            <ScrollArea className="h-full">
                {/* Header da Sidebar */}
                <div className="flex sticky top-0 bg-white z-10 items-center justify-between p-4 border-b">
                    <h3 className="font-semibold text-lg flex items-center"><MapPin className="mr-2 h-5 w-5 text-slate-600" /> Memórias</h3>
                     <div className="flex items-center space-x-2">
                         <Button variant="outline" size="sm" onClick={() => onAddMemoryClick(place)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
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
                            <p className="text-sm">Seja o primeiro a criar uma!</p>
                        </div>
                    )}
                    {!isLoading && memories.map((memory) => (
                        <Card key={memory.id} onClick={() => onMemorySelect(memory)} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={memory.author.avatar || ''} />
                                        <AvatarFallback>{memory.author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-base">{memory.title}</CardTitle>
                                        <CardDescription className="text-xs">por {memory.author.name}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                {memory.image && (
                                    <img
                                        src={memory.image}
                                        alt={memory.title}
                                        className="w-full h-32 object-cover rounded-lg mb-3"
                                    />
                                )}
                                <p className="text-sm text-slate-700 mb-3 line-clamp-2">{memory.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {/* Botões de Like e Comentário (lógica a ser implementada) */}
                                        <div className="flex items-center text-xs text-slate-500">
                                            <Heart className={`w-4 h-4 mr-1 ${memory.liked ? "fill-red-500 text-red-500" : "text-slate-500"}`} />
                                            {memory.likes}
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <MessageCircle className="w-4 h-4 mr-1 text-slate-500" />
                                            {memory.comments.length}
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">{memory.createdAt}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
