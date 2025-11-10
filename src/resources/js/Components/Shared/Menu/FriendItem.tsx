import React from "react";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Ban, MoreVertical, UserX } from "lucide-react";
import { Friend } from "@/Types/models";


interface FriendItemProps {
    friend: Friend;
    onRemove: () => void;
    onBlock: () => void;
}

export function FriendItem({ friend, onRemove, onBlock }: FriendItemProps) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F4ED] transition-colors">
            <div className="relative">
                <Avatar className="h-10 w-10">
                    <AvatarImage
                        src={friend.avatar_url || "/placeholder.svg"}
                        alt={friend.username}
                    />
                    <AvatarFallback className="bg-[#8B9A7E] text-white">
                        {friend.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${friend.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#3A3A3A] truncate">
                    {friend.username}
                </p>
                <p className="text-xs text-[#5C4A3A]/50">
                    #{friend.discriminator}
                </p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-[#5C4A3A] hover:bg-[#E8E6D4]"
                    >
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-white border-[#E8E6D4] shadow-lg p-0 data-[state=open]:animate-in data-[state=closed]:animate-out">
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        onClick={onRemove}
                    >
                        <UserX className="mr-2 h-4 w-4" />
                        Remover
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        onClick={onBlock}
                    >
                        <Ban className="mr-2 h-4 w-4" />
                        Bloquear
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
