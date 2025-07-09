import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Memory, Place } from '@/Types/models';
import { ScrollArea } from '@/Components/ui/scroll-area';

import { SidebarHeader } from './PinSideBarHeader';
import { MemoryList } from './MemoryList';

interface PinSidebarProps {
    isOpen: boolean;
    isLoading: boolean;
    memories: Memory[];
    place: Place | null;
    onClose: () => void;
    onMemorySelect: (memory: Memory) => void;
    onAddMemoryClick: (place: Place) => void;
    onLike: (memory: Memory) => void; // Adiciona a prop onLike
}

const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const PinSidebar: React.FC<PinSidebarProps> = ({
    isOpen,
    isLoading,
    memories,
    place,
    onClose,
    onMemorySelect,
    onAddMemoryClick,
    onLike,
}) => {
    return (
        <AnimatePresence>
            {isOpen && place && (
                <motion.div
                    key={place.id} // Garante a animação de saída da sidebar inteira se o place mudar
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute top-0 right-0 z-[1000] h-full w-full bg-white shadow-lg md:w-96"
                >
                    <ScrollArea className="h-full">
                        <motion.div
                            key={place.id} // Chave para animar a troca de conteúdo
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <SidebarHeader
                                place={place}
                                onClose={onClose}
                                onAddMemoryClick={onAddMemoryClick}
                            />
                            <MemoryList
                                isLoading={isLoading}
                                memories={memories} // Passa a lista de memórias
                                onMemorySelect={onMemorySelect}
                                onLike={onLike} // Passa a função de like
                            />
                        </motion.div>
                    </ScrollArea>
                </motion.div>
            )}
        </AnimatePresence>
    );
};