import React from 'react';
import { Place } from '@/Types/models';
import { Button } from '@/components/ui/button';
import { X, MapPin, Plus } from 'lucide-react';

// Props que o cabeçalho precisa para funcionar
interface SidebarHeaderProps {
    place: Place;
    onClose: () => void;
    onAddMemoryClick: (place: Place) => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
    place,
    onClose,
    onAddMemoryClick,
}) => (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
        <h3 className="flex items-center text-lg font-semibold">
            <MapPin className="mr-2 h-5 w-5 text-slate-600" /> Memórias
        </h3>
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onAddMemoryClick(place)}
            >
                <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
            </Button>
        </div>
    </div>
);
