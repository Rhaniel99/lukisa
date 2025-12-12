import { Memory, Place } from '@/Types/Memories';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface MemoriesContextType {
    // Zoom (Estado compartilhado para o Leaflet)
    zoomLevel: number;
    setZoomLevel: (zoom: number) => void;
    handleZoomIn: () => void;
    handleZoomOut: () => void;

    // Drawer & Modais
    isAddModalOpen: boolean;
    setAddModalOpen: (open: boolean) => void;
    
    isDrawerOpen: boolean;
    selectedPlace: Place | null; // Alterado de string para Place
    openDrawerForPlace: (place: Place) => void;
    closeDrawer: () => void;

    // Memória Selecionada
    selectedMemory: Memory | null;
    selectMemory: (memory: Memory | null) => void;
}

const MemoriesContext = createContext<MemoriesContextType | null>(null);

export function MemoriesProvider({ children }: { children: ReactNode }) {
    // Zoom inicial do Leaflet
    const [zoomLevel, setZoomLevel] = useState(13); 

    const handleZoomIn = useCallback(() => setZoomLevel(prev => prev + 1), []);
    const handleZoomOut = useCallback(() => setZoomLevel(prev => prev - 1), []);

    // UI States
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

    const openDrawerForPlace = useCallback((place: Place) => {
        setSelectedPlace(place);
        setIsDrawerOpen(true);
        setAddModalOpen(false);
    }, []);

    const closeDrawer = useCallback(() => {
        setIsDrawerOpen(false);
        setSelectedPlace(null);
    }, []);

    const selectMemory = useCallback((memory: Memory | null) => {
        setSelectedMemory(memory);
    }, []);

    return (
        <MemoriesContext.Provider value={{
            zoomLevel, setZoomLevel, handleZoomIn, handleZoomOut,
            isAddModalOpen, setAddModalOpen,
            isDrawerOpen, selectedPlace, openDrawerForPlace, closeDrawer,
            selectedMemory, selectMemory
        }}>
            {children}
        </MemoriesContext.Provider>
    );
}

export function useMemoriesUI() {
    const context = useContext(MemoriesContext);
    if (!context) throw new Error('useMemoriesUI must be used within MemoriesProvider');
    return context;
}