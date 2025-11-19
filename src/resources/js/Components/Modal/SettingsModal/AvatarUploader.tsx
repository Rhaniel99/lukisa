// src/resources/js/Pages/Auth/Profile/Components/AvatarUploader.tsx
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { ImageCropperModal } from "@/Components/Shared/ImageCropperModal";

interface MediaItem {
    id: number;
    url: string;
}

interface AvatarUploaderProps {
    currentAvatarUrl: string | null;
    username: string;
    history: MediaItem[];
    selectedHistoryId: number | null;
    onAvatarChange: (file: File) => void;
    onHistorySelect: (id: number | null, url: string) => void;
}

export function AvatarUploader({ 
    currentAvatarUrl, 
    username, 
    history, 
    selectedHistoryId,
    onAvatarChange, 
    onHistorySelect 
}: AvatarUploaderProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setTempImageSrc(reader.result as string);
                setIsCropOpen(true);
            };
            reader.readAsDataURL(e.target.files[0]);
            e.target.value = ""; // Reset input
        }
    };

    const handleCropConfirm = (blob: Blob) => {
        const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
        onAvatarChange(file);
        setPreviewUrl(URL.createObjectURL(blob));
    };

    const handleHistoryClick = (item: MediaItem) => {
        setPreviewUrl(item.url);
        onHistorySelect(item.id, item.url);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24 border-2 border-[#403E34]">
                    <AvatarImage src={previewUrl || ""} className="object-cover" />
                    <AvatarFallback style={{ backgroundColor: "#403E34", color: "#D9D7C5" }}>
                        {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                />

                <Button
                    type="button"
                    variant="outline"
                    className="border-2 bg-transparent hover:bg-[#403E34]/10 border-[#403E34] text-[#403E34]"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Alterar Foto
                </Button>
            </div>

            {history.length > 0 && (
                <div className="space-y-2">
                    <Label className="text-xs uppercase text-lukisa-brown font-bold tracking-wider">
                        Anteriores
                    </Label>
                    <div className="flex gap-3">
                        {history.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleHistoryClick(item)}
                                className={`
                                    relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all
                                    ${selectedHistoryId === item.id 
                                        ? "border-[#403E34] scale-110 ring-2 ring-[#8B9A7E] ring-offset-1" 
                                        : "border-transparent hover:border-[#737065] hover:scale-105"
                                    }
                                `}
                            >
                                <img src={item.url} alt="Avatar antigo" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <ImageCropperModal
                isOpen={isCropOpen}
                onClose={() => setIsCropOpen(false)}
                imageSrc={tempImageSrc}
                onConfirm={handleCropConfirm}
            />
        </div>
    );
}