import React from "react";
import { Memory } from "@/Types/models";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, X } from "lucide-react";

interface MemoryCardProps {
    memory: Memory;
    onSelect: (memory: Memory) => void;
    onLike: (memory: Memory) => void;
    onDelete: (e: React.MouseEvent, memoryId: number) => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = React.memo(
    ({ memory, onSelect, onLike, onDelete }) => {
        return (
            <Card className="relative transition-shadow hover:shadow-md">
                {memory.is_owner && (
                    <button
                        onClick={(e) => onDelete(e, memory.id)}
                        className="absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-gray-200 opacity-75 transition-all hover:bg-red-600 hover:opacity-100 hover:scale-110"
                        aria-label="Remover memória"
                    >
                        <X size={16} />
                    </button>
                )}

                <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={memory.author.avatar || ""} />
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
                            onClick={() => onSelect(memory)}
                            className="mb-3 h-32 w-full cursor-pointer rounded-lg object-cover"
                        />
                    )}
                    <p className="mb-3 text-sm text-slate-700 line-clamp-2">
                        {memory.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-xs text-slate-500">
                                <Heart
                                    onClick={() => onLike(memory)}
                                    className={`mr-1 h-4 w-4 cursor-pointer transition-all ${
                                        memory.liked
                                            ? "fill-red-500 text-red-500"
                                            : "text-slate-500 hover:text-red-400"
                                    }`}
                                />
                                {memory.likes}
                            </div>
                            <div className="flex items-center text-xs text-slate-500">
                                <MessageCircle className="mr-1 h-4 w-4 text-slate-500" />
                                {memory.commentsCount ?? memory.comments.length}
                            </div>
                        </div>
                        <span className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {memory.created}
                        </span>
                    </div>
                </CardContent>
            </Card>
        );
    }
);
