import React from 'react';
import { Memory, Place } from '@/Types/models';
import { ScrollArea } from '@/components/ui/scroll-area';

// Importando os componentes filhos
import { SidebarHeader } from './PinSideBarHeader';
import { MemoryList } from './MemoryList';

// As props do componente principal não mudam
interface PinSidebarProps {
    isOpen: boolean;
    isLoading: boolean;
    memories: Memory[];
    place: Place | null;
    onClose: () => void;
    onMemorySelect: (memory: Memory) => void;
    onAddMemoryClick: (place: Place) => void;
}

export const PinSidebar: React.FC<PinSidebarProps> = ({
    isOpen,
    isLoading,
    memories,
    place,
    onClose,
    onMemorySelect,
    onAddMemoryClick,
}) => {
    // A lógica para não renderizar continua a mesma
    if (!isOpen || !place) {
        return null;
    }

    return (
        <div
            className="absolute top-0 right-0 z-[1000] h-full w-full transform-gpu bg-white shadow-lg transition-transform duration-300 ease-in-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 md:w-96"
            data-state={isOpen ? 'open' : 'closed'}
        >
            <ScrollArea className="h-full">
                {/* 1. Usa o componente de cabeçalho importado */}
                <SidebarHeader
                    place={place}
                    onClose={onClose}
                    onAddMemoryClick={onAddMemoryClick}
                />

                {/* 2. Usa o componente de lista de memórias */}
                <MemoryList
                    isLoading={isLoading}
                    initialMemories={memories}
                    onMemorySelect={onMemorySelect}
                />
            </ScrollArea>
        </div>
    );
};
