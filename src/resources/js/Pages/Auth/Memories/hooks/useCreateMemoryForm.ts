import { useEffect, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { LatLng } from 'leaflet';

interface UseMemoryProps {
    isOpen: boolean;
    coords: LatLng | null;
    placeMeta?: {
        name: string | null;
        address: string | null;
    } | null;
    onSuccess?: () => void;
}

export function useCreateMemoryForm({
    isOpen,
    coords,
    placeMeta,
    onSuccess,
}: UseMemoryProps) {

    const form = useForm<{
        title: string;
        content: string;      // Mudou de 'description'
        place_name: string;
        latitude: number | null;
        longitude: number | null;
        media: File | null;   // Mudou de 'image'
    }>({
        title: '',
        content: '',
        place_name: '',
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
        media: null,
    });

    // 🔄 Reset ao abrir modal
    useEffect(() => {
        if (!isOpen) return;

        form.reset();
        form.setData({
            title: '',
            content: '',
            place_name: placeMeta?.name ?? '',
            latitude: coords?.lat ?? null,
            longitude: coords?.lng ?? null,
            media: null,
        });
    }, [isOpen, coords, placeMeta]);

    // 📷 Upload
    const handleImageUpload = (file: File | null) => {
        form.setData('media', file);
    };

    // 👁️ Preview
    const imagePreview = useMemo(() => {
        if (!form.data.media) return null;
        return URL.createObjectURL(form.data.media);
    }, [form.data.media]);

    // 💾 Submit
    const submit = () => {
        form.post(route('memo.maps.store'), {
            preserveScroll: true,
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return {
        form,
        imagePreview,
        handleImageUpload,
        submit,
    };
}
