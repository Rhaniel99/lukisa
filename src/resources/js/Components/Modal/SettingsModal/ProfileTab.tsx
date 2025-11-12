import { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { AuthUser as UserData } from "@/Types/models";
import { Form } from "@/Components/UI/Form";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { getCroppedImg } from "@/Lib/CropImg"; // Certifique-se de que o caminho está correto
import Cropper, { Area } from "react-easy-crop";

// Adicione Interface para o histórico
interface MediaItem {
    id: number;
    url: string;
}

// Atualize a interface do UserData para incluir o history
interface UserWithHistory extends UserData {
    avatar_history?: MediaItem[];
}

interface ProfileTabProps {
    user: UserWithHistory;
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        isDirty,
    } = useForm({
        fullname: user.fullname || "",
        username: user.username || "",
        avatar: null as File | null,
        media_id: null as number | null,
        _method: "PATCH",
    });

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

    // Inicializa com a URL do usuário, mas será atualizado com o blob local
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatar_url);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl as string);
            setIsCropDialogOpen(true);
            e.target.value = "";
        }
    };

    const readFile = (file: File) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        });
    };

    const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const showCroppedImage = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

            if (croppedBlob) {
                const file = new File([croppedBlob], "avatar.jpg", { type: "image/jpeg" });
                setData("avatar", file);
                setData("media_id", null); // Limpa seleção de histórico se houver
                setPreviewUrl(URL.createObjectURL(croppedBlob));
                setIsCropDialogOpen(false);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSelectHistory = (media: MediaItem) => {
        // 1. Atualiza o preview visualmente
        setPreviewUrl(media.url);

        // 2. Define o ID para envio
        setData("media_id", media.id);

        // 3. Limpa qualquer upload pendente (prioridade para o histórico)
        setData("avatar", null);
    };

    const submit = () => {
        post(route("profile.update"), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <>
            <Form onSubmit={submit} className="space-y-6">
                <div className="space-y-6">
                    <h3 className="text-xl font-bold" style={{ color: "#0D0000" }}>
                        Meu Perfil
                    </h3>
                    <div className="flex items-center space-x-6">
                        <Avatar className="w-24 h-24">
                            {/* CORREÇÃO AQUI: Usar previewUrl em vez de user.avatar_url */}
                            <AvatarImage src={previewUrl || ""} className="object-cover" />
                            <AvatarFallback
                                style={{
                                    backgroundColor: "#403E34",
                                    color: "#D9D7C5",
                                }}
                            >
                                {user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                            ref={fileInputRef}
                            className="hidden"
                        />

                        <Button
                            type="button"
                            variant="outline"
                            className="border-2 bg-transparent hover:bg-[#403E34]/10"
                            style={{
                                borderColor: "#403E34",
                                color: "#403E34",
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Alterar Foto
                        </Button>

                        {user.avatar_history && user.avatar_history.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-xs uppercase text-lukisa-brown font-bold tracking-wider">
                                    Anteriores
                                </Label>
                                <div className="flex gap-3">
                                    {user.avatar_history.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => handleSelectHistory(item)}
                                            className={`
                                        relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all
                                        ${data.media_id === item.id
                                                    ? "border-[#403E34] scale-110 ring-2 ring-[#8B9A7E] ring-offset-1"
                                                    : "border-transparent hover:border-[#737065] hover:scale-105"
                                                }
                                    `}
                                        >
                                            <img
                                                src={item.url}
                                                alt="Avatar antigo"
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="profile-fullName" style={{ color: "#0D0000" }}>
                                Nome Completo
                            </Label>
                            <Input
                                id="profile-fullName"
                                type="text"
                                value={data.fullname}
                                onChange={(e) => setData("fullname", e.target.value)}
                                className="border-2"
                                style={{ borderColor: "#737065" }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profile-username" style={{ color: "#0D0000" }}>
                                Nome de Usuário
                            </Label>
                            <Input
                                id="profile-username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData("username", e.target.value)}
                                className="border-2"
                                style={{ borderColor: "#737065" }}
                            />
                        </div>

                        {/* Botão habilita se houver mudanças no texto OU se houver um novo avatar */}
                        <Button
                            type="submit"
                            disabled={processing || (!isDirty && !data.avatar)}
                            style={{
                                backgroundColor: processing || (!isDirty && !data.avatar) ? "#737065" : "#403E34",
                                color: "#D9D7C5",
                                cursor: processing || (!isDirty && !data.avatar) ? "not-allowed" : "pointer",
                            }}
                        >
                            {processing ? "Salvando..." : "Salvar Alterações"}
                        </Button>

                        {recentlySuccessful && (
                            <span className="text-sm text-lukisa-sage ml-2">
                                Salvo!
                            </span>
                        )}
                    </div>
                </div>
            </Form>

            <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
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
                                onCropComplete={onCropComplete}
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
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-2 bg-[#E8E6D4] rounded-lg appearance-none cursor-pointer accent-[#403E34]"
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsCropDialogOpen(false)}
                            className="border-[#403E34] text-[#403E34] hover:bg-[#E8E6D4]"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={showCroppedImage}
                            style={{ backgroundColor: "#403E34", color: "#D9D7C5" }}
                        >
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};