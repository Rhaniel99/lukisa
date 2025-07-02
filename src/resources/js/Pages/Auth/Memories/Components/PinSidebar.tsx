import React from "react";
import { Memory, Place } from "@/Types/models";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, MapPin, Plus } from "lucide-react";
import { MemoryList } from "./MemoryList";

interface PinSidebarProps {
    isOpen: boolean;
    isLoading: boolean;
    memories: Memory[];
    place: Place | null;
    onClose: () => void;
    onMemorySelect: (memory: Memory) => void;
    onAddMemoryClick: (place: Place) => void;
}

const SidebarHeader: React.FC<
    Pick<PinSidebarProps, "place" | "onClose" | "onAddMemoryClick">
> = ({ place, onClose, onAddMemoryClick }) => (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
        <h3 className="flex items-center text-lg font-semibold">
            <MapPin className="mr-2 h-5 w-5 text-slate-600" /> Memórias
        </h3>
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onAddMemoryClick(place!)}
            >
                <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
            </Button>
        </div>
    </div>
);

export const PinSidebar: React.FC<PinSidebarProps> = ({
    isOpen,
    isLoading,
    memories,
    place,
    onClose,
    onMemorySelect,
    onAddMemoryClick,
}) => {
    if (!isOpen || !place) {
        return null;
    }

    return (
        <div
            className="absolute top-0 right-0 z-[1000] h-full w-full transform-gpu bg-white shadow-lg transition-transform duration-300 ease-in-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 md:w-96"
            data-state={isOpen ? "open" : "closed"}
        >
            <ScrollArea className="h-full">
                <SidebarHeader
                    place={place}
                    onClose={onClose}
                    onAddMemoryClick={onAddMemoryClick}
                />
                <MemoryList
                    isLoading={isLoading}
                    initialMemories={memories}
                    onMemorySelect={onMemorySelect}
                />
            </ScrollArea>
        </div>
    );
};
