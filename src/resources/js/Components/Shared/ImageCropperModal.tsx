// src/resources/js/Components/Shared/ImageCropperModal.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/Lib/CropImg";

interface ImageCropperModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string | null;
    onConfirm: (croppedBlob: Blob) => void;
}

export function ImageCropperModal({ isOpen, onClose, imageSrc, onConfirm }: ImageCropperModalProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const handleConfirm = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        try {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (croppedBlob) {
                onConfirm(croppedBlob);
                onClose();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-[#F5F4ED] border-[#E8E6D4]">
                <DialogHeader>
                    <DialogTitle className="text-[#403E34]">Ajustar Imagem</DialogTitle>
                </DialogHeader>

                <div className="relative w-full h-[300px] bg-black rounded-md overflow-hidden mt-4">
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                            onZoomChange={setZoom}
                            cropShape="round"
                            showGrid={false}
                        />
                    )}
                </div>

                <div className="py-4 flex items-center gap-4">
                    <span className="text-sm text-[#403E34] font-medium">Zoom</span>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-2 bg-[#E8E6D4] rounded-lg appearance-none cursor-pointer accent-[#403E34]"
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-[#403E34] text-[#403E34] hover:bg-[#E8E6D4]">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} style={{ backgroundColor: "#403E34", color: "#D9D7C5" }}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}