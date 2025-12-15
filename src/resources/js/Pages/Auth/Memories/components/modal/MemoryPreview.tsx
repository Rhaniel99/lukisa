// components/modal/MemoryPreview.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Image as ImageIcon, MapPin } from 'lucide-react';

interface MemoryPreviewProps {
    title: string;
    description: string;
    image: string | null;
    authorName?: string;
    authorAvatar?: string | null;
}

export function MemoryPreview({
    title,
    description,
    image,
    authorName = 'Você',
    authorAvatar,
}: MemoryPreviewProps) {
    const userInitial = authorName.charAt(0).toUpperCase();

    return (
        <div className="w-full md:w-80 bg-[#E8DCC4]/50 p-8 border-l border-[#D4C5A9] flex flex-col items-center justify-center">
            <p className="text-[#6B4E3D] text-sm font-bold mb-4 tracking-wide uppercase">
                Live Preview
            </p>

            {/* Card Preview */}
            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-xl border border-[#E8DCC4] transform transition-all hover:-translate-y-1">
                <div className="h-40 bg-[#D4C5A9] relative">
                    {image ? (
                        <img
                            src={image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#E8DCC4]">
                            <ImageIcon className="w-12 h-12 text-[#8B7355]/50" />
                        </div>
                    )}

                    <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-lg shadow-sm">
                        <MapPin className="w-4 h-4 text-[#6B4E3D]" />
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-6 h-6 border border-[#6B4E3D]">
                            {/* O src aceita null/undefined. Se falhar ou for null, ele esconde a img e mostra o fallback */}
                            <AvatarImage
                                src={authorAvatar || undefined}
                                alt={authorName}
                                className="object-cover"
                            />

                            {/* Fallback customizado com suas cores */}
                            <AvatarFallback className="bg-[#6B4E3D] text-white text-[10px] font-medium">
                                {userInitial}
                            </AvatarFallback>
                        </Avatar>

                        <span className="text-xs text-[#8B7355]">{authorName}</span>
                        <span className="text-xs text-[#D4C5A9]">• Agora</span>
                    </div>

                    <h3 className="font-bold text-[#3D2817] text-sm mb-1 line-clamp-1">
                        {title || 'Título da Memória'}
                    </h3>

                    <p className="text-[#6B4E3D] text-xs line-clamp-2 leading-relaxed">
                        {description || 'Sua descrição aparecerá aqui...'}
                    </p>
                </div>
            </div>

            <p className="mt-6 text-center text-xs text-[#8B7355]">
                É assim que sua memória aparecerá no mapa para seus amigos.
            </p>
        </div>
    );
}
