import { useState, useCallback } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Place, Memory, PageProps } from '@/Types/models';

type MemoriesIndexPageProps = PageProps & {
    selectedPlaceMemories?: Memory[];
};

export const usePinSidebar = () => {
    const { props } = usePage<MemoriesIndexPageProps>();
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const open = useCallback((place: Place) => {
        // Se o mesmo pin for clicado, fecha a sidebar
        if (selectedPlace?.id === place.id) {
            setSelectedPlace(null);
            return;
        }

        setSelectedPlace(place);
        setIsLoading(true);

        router.reload({
            only: ['selectedPlaceMemories'],
            data: { place_id: place.id },
            onFinish: () => setIsLoading(false),
        });
    }, [selectedPlace]);

    const close = useCallback(() => {
        setSelectedPlace(null);
    }, []);

    return {
        isOpen: !!selectedPlace,
        isLoading,
        place: selectedPlace,
        memories: props.selectedPlaceMemories || [],
        open,
        close,
    };
};
