import { useRef, useState } from "react";
import { Camera, Loader2, Upload, User } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function ProfileForm() {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Hook do Inertia para gerenciamento de formulário
    const { data, setData, post, processing } = useForm({
        username: "",
        avatar: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            setData("avatar", file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("profile.register"));
    };

    return (
        <form onSubmit={submit} className="flex flex-col items-center space-y-8 mt-6">
            
            {/* --- Área do Avatar --- */}
            <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                    {/* Círculo do Avatar */}
                    <div className={`w-32 h-32 rounded-full border-4 border-[#E8DCC4] bg-[#E8DCC4]/30 flex items-center justify-center overflow-hidden transition-all duration-300 ${!avatarPreview ? 'border-dashed' : 'border-solid shadow-md'}`}>
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <Camera className="w-10 h-10 text-[#8B7355]" />
                        )}
                    </div>

                    {/* Botão Flutuante de Upload (Ícone pequeno) */}
                    <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-[#6B4E3D] p-2 rounded-full cursor-pointer shadow-lg hover:bg-[#3D2817] transition-colors z-10"
                    >
                        <Upload className="w-4 h-4 text-[#F5EFE6]" />
                    </button>
                    
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Botão de Texto "Enviar Avatar" */}
                <div className="flex flex-col items-center">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-transparent border border-[#D4C5A9] rounded-lg text-[#6B4E3D] text-sm hover:bg-[#E8DCC4]/50 transition-colors mb-1"
                    >
                        Enviar Avatar
                    </button>
                    <span className="text-[10px] text-[#8B7355]">Apenas arquivos PNG ou JPG</span>
                </div>
            </div>

            {/* --- Área do Username --- */}
            <div className="w-full">
                <label htmlFor="username" className="block text-[#3D2817] mb-2 text-sm font-medium text-left">
                    Nome de Usuário
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                    <input
                        type="text"
                        id="username"
                        placeholder="Escolha um nome de usuário"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] border border-[#D4C5A9] rounded-lg focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                        required
                    />
                </div>
            </div>

            {/* --- Botão Final --- */}
            <button
                type="submit"
                disabled={!data.avatar || processing}
                className={`w-full py-4 rounded-lg transition-all duration-300 shadow-md font-medium flex items-center justify-center ${
                    (data.avatar && !processing)
                        ? 'bg-[#6B4E3D] text-[#F5EFE6] hover:bg-[#3D2817] hover:shadow-lg'
                        : 'bg-[#8B7355] text-[#F5EFE6]/50 cursor-not-allowed'
                }`}
            >
                {processing ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Salvando...
                    </>
                ) : (
                    "Pronto"
                )}
            </button>
        </form>
    );
}