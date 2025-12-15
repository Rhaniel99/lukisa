import { Upload, MapPin } from 'lucide-react';

interface MemoryFormProps {
    title: string;
    description: string;
    placeName: string;
    onTitleChange: (v: string) => void;
    onDescriptionChange: (v: string) => void;
    onPlaceNameChange: (v: string) => void;
    onImageChange: (file: File | null) => void;
}

export function MemoryForm({
    title,
    description,
    placeName,
    onTitleChange,
    onDescriptionChange,
    onPlaceNameChange,
    onImageChange,
}: MemoryFormProps) {
    return (
        <div className="space-y-4">

            {/* Local */}
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#6B4E3D]">Local</label>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#E8DCC4]/30 border border-[#D4C5A9]">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#EFE6DA] border border-[#E8DCC4]">
                        <MapPin className="w-5 h-5 text-[#6B4E3D]" />
                    </div>

                    <input
                        type="text"
                        value={placeName}
                        onChange={(e) => onPlaceNameChange(e.target.value)}
                        className="flex-1 bg-transparent text-[#3D2817] focus:outline-none text-sm"
                        placeholder="Nome do local"
                    />
                </div>
            </div>

            {/* Título */}
            <div>
                <label className="block text-sm font-semibold text-[#6B4E3D] mb-2">
                    Título
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Ex: O melhor café da cidade"
                    className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D]"
                />
            </div>

            {/* Descrição */}
            <div>
                <label className="block text-sm font-semibold text-[#6B4E3D] mb-2">
                    Sua Memória
                </label>
                <textarea
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    rows={4}
                    placeholder="Descreva o que aconteceu..."
                    className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl resize-none focus:outline-none focus:border-[#6B4E3D]"
                />
            </div>

            {/* Upload */}
            <div>
                <label className="block text-sm font-semibold text-[#6B4E3D] mb-2">
                    Foto ou Áudio
                </label>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#D4C5A9] rounded-xl cursor-pointer hover:bg-[#E8DCC4]/30">
                    <Upload className="w-8 h-8 text-[#8B7355] mb-2" />
                    <span className="text-sm text-[#6B4E3D]">
                        Clique para enviar
                    </span>
                    <input type="file" hidden accept="image/*" onChange={(e) => onImageChange(e.target.files?.[0] ?? null)} />
                </label>
            </div>
        </div>
    );
}
