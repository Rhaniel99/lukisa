import React from "react";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Check, X } from "lucide-react";
import { PendingFriend } from "@/Types/models";

interface PendingFriendItemProps {
    friend: PendingFriend;
    onAccept: () => void;
    onReject: () => void;
}

export function PendingFriendItem({ friend, onAccept, onReject }: PendingFriendItemProps) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#F5F4ED]">
            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={friend.avatar_url || "/placeholder.svg"}
                    alt={friend.username}
                />
                <AvatarFallback className="bg-[#8B9A7E] text-white">
                    {friend.username.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#3A3A3A] truncate">
                    {friend.username}
                </p>
                <p className="text-xs text-[#5C4A3A]/50">
                    #{friend.discriminator}
                </p>
            </div>
            <div className="flex gap-1">
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                    onClick={onAccept}
                >
                    <Check className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={onReject}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
