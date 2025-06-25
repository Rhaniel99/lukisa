import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/Components/UI/Form";
import { useForm } from "@inertiajs/react";

export default function ProfileForm() {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const submit = () => {
        post(route("profile.register"));
    };

    return (
        <>
            <Form onSubmit={submit} className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24 border-4 border-lukisa-cream">
                        <AvatarImage src={avatarPreview || undefined} />
                        <AvatarFallback className="bg-lukisa-light text-lukisa-dark text-2xl">
                            <Camera className="w-8 h-8" />
                        </AvatarFallback>
                    </Avatar>

                    <div className="text-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="border-lukisa-cream hover:bg-lukisa-light text-lukisa-brown"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Enviar Avatar
                        </Button>
                        <p className="text-xs text-lukisa-brown mt-2">
                            Apenas arquivos PNG ou JPG
                        </p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="username" className="text-lukisa-dark">
                        Nome de Usuário
                    </Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                        <Input
                            id="username"
                            type="text"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            placeholder="Escolha um nome de usuário"
                            className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                            required
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-lukisa-sage hover:bg-lukisa-brown text-white"
                    size="lg"
                    disabled={processing}
                >
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        "Pronto"
                    )}
                </Button>
            </Form>
        </>
    );
}
