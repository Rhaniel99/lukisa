// resources/js/Pages/Memories/CreateMemoryForm.tsx (novo arquivo)
import React from "react";
import { useForm } from "@inertiajs/react";
import { LatLng } from "leaflet";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Form } from "@/Components/Shared/Form/Form";

interface CreateMemoryFormProps {
    coordinates: LatLng;
    onSuccess: () => void;
}

const CreateMemoryForm: React.FC<CreateMemoryFormProps> = ({
    coordinates,
    onSuccess,
}) => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        media: null as File | null, // Para um único arquivo
    });

    const submit = () => {
        post(route("memo.maps.store"), {
            preserveScroll: true,
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setData("media", file);

        // Debug: verificar se o arquivo foi selecionado
        // if (file) {
        //     console.log("Arquivo selecionado:", {
        //         name: file.name,
        //         size: file.size,
        //         type: file.type,
        //     });
        // }
    };

    return (
        <Form onSubmit={submit} className="space-y-4">
            <div>
                <Label htmlFor="title">Título</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />
                {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
            </div>
            <div>
                <Label htmlFor="content">Sua Memória</Label>
                <textarea
                    id="content"
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    className="w-full border rounded-md p-2"
                />
                {errors.content && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.content}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="media">Foto ou Áudio</Label>
                <Input
                    id="media"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg,audio/mpeg,audio/wav,audio/mp3"
                    onChange={handleFileChange}
                />
                {errors.media && (
                    <p className="text-red-500 text-xs mt-1">{errors.media}</p>
                )}

                {/* Preview do arquivo selecionado */}
                {data.media && (
                    <div className="mt-2 text-sm text-gray-600">
                        Arquivo selecionado: {data.media.name}
                        <br />
                        Tamanho: {(data.media.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                )}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? "Salvando..." : "Salvar Memória"}
            </Button>
        </Form>
    );
};

export default CreateMemoryForm;
