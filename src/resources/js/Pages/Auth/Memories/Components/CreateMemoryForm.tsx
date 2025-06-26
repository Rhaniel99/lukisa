// resources/js/Pages/Memories/CreateMemoryForm.tsx (novo arquivo)
import React from 'react';
import { useForm } from '@inertiajs/react';
import { LatLng } from 'leaflet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateMemoryFormProps {
    coordinates: LatLng;
    onSuccess: () => void;
}

const CreateMemoryForm: React.FC<CreateMemoryFormProps> = ({ coordinates, onSuccess }) => {
    console.log(coordinates);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        media: null as File | null, // Para um único arquivo
    });

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     post(route('memories.store'), {
    //         onSuccess: () => onSuccess(),
    //     });
    // };

    return (
        <form className="space-y-4">
            <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
                <Label htmlFor="content">Sua Memória</Label>
                <textarea id="content" value={data.content} onChange={e => setData('content', e.target.value)} className="w-full border rounded-md p-2" />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
            </div>
            <div>
                <Label htmlFor="media">Foto ou Áudio</Label>
                <Input id="media" type="file" onChange={e => setData('media', e.target.files ? e.target.files[0] : null)} />
            </div>
            <Button type="submit" disabled={processing}>
                {processing ? 'Salvando...' : 'Salvar Memória'}
            </Button>
        </form>
    );
};

export default CreateMemoryForm;
