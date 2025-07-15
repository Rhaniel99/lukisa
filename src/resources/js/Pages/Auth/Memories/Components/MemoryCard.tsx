import React from "react";
import { Memory } from "@/Types/models";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    FilePenLine,
    Heart,
    MessageCircle,
    MoreHorizontal,
    Trash2,
    X,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

interface MemoryCardProps {
    memory: Memory;
    onSelect: (memory: Memory) => void;
    onLike: (memory: Memory) => void;
    onDelete: (e: React.MouseEvent, memoryId: number) => void;
    onEdit: (e: React.MouseEvent, memoryId: number) => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = React.memo(
    ({ memory, onSelect, onLike, onDelete, onEdit }) => {
        const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

        return (
            <Card className="relative transition-shadow hover:shadow-md">
                {memory.is_owner && (
                    <div className="absolute top-2 right-2 z-20">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    onClick={stopPropagation}
                                    className="flex h-8 w-8 items-center justify-center border border-transparent text-lukisa-sage hover:bg-lukisa-cream/50 hover:text-lukisa-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lukisa-sage"
                                    aria-label="Opções da memória"
                                >
                                    <MoreHorizontal size={20} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-40 bg-white"
                                onClick={stopPropagation}
                            >
                                <DropdownMenuItem
                                    onClick={(e) => onEdit(e, memory.id)}
                                    className="cursor-pointer"
                                >
                                    <FilePenLine className="mr-2 h-4 w-4" />
                                    <span>Editar</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={(e) => onDelete(e, memory.id)}
                                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Excluir</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={memory.author.avatar_url || ""} />
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
                            <div
                                className="flex cursor-pointer items-center text-xs text-slate-500"
                                onClick={() => onSelect(memory)}
                            >
                                <MessageCircle className="mr-1 h-4 w-4 text-slate-500" />
                                {memory.comments_count ??
                                    memory.comments.length}
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
