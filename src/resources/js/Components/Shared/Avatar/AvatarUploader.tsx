// /src/resources/js/Components/Shared/Avatar/AvatarUploader.tsx
import { useState, useRef, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { ImageCropperModal } from "@/Components/Shared/ImageCropperModal";
import { AvatarHistoryList } from "./AvatarHistoryList";
import type { MediaItem } from "@/Types/Avatar";

interface AvatarUploaderProps {
  currentAvatarUrl: string | null;
  username: string;
  history: MediaItem[];
  selectedHistoryId: number | null;
  onAvatarChange: (file: File) => void;
  onHistorySelect: (id: number | null, url: string) => void;
  onInteract?: () => void; // chamada quando o usuário interage (upload / escolhe histórico)
}

export function AvatarUploader({
  currentAvatarUrl,
  username,
  history,
  selectedHistoryId,
  onAvatarChange,
  onHistorySelect,
  onInteract,
}: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cropOpen, setCropOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl);

  // quando upload selecionado
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTempImageSrc(reader.result as string);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
    onInteract?.();
  }, [onInteract]);

  // quando crop ok
  const handleCropConfirm = useCallback((blob: Blob) => {
    const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
    onAvatarChange(file);
    setPreviewUrl(URL.createObjectURL(blob)); // preview local
    setCropOpen(false);
    onInteract?.();
  }, [onAvatarChange, onInteract]);

  // quando escolhe ícone do histórico
  const handleHistoryClick = useCallback((item: MediaItem) => {
    setPreviewUrl(item.url);
    onHistorySelect(item.id, item.url);
    onInteract?.();
  }, [onHistorySelect, onInteract]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <Avatar className="w-24 h-24 border-2 border-[#403E34]">
          <AvatarImage src={previewUrl || ""} className="object-cover" />
          <AvatarFallback className="bg-[#403E34] text-[#D9D7C5]">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <input
          ref={fileInputRef}
          type="file"
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

      <AvatarHistoryList
        history={history}
        selectedId={selectedHistoryId}
        onSelect={handleHistoryClick}
      />

      <ImageCropperModal
        isOpen={cropOpen}
        onClose={() => setCropOpen(false)}
        imageSrc={tempImageSrc}
        onConfirm={handleCropConfirm}
      />
    </div>
  );
}
