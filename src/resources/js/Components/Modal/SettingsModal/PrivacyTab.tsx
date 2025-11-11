import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";

export const PrivacyTab = () => {
    return (
        <div className="space-y-6">
            <h3
                className="text-xl font-bold"
                style={{ color: "#0D0000" }}
            >
                Privacidade
            </h3>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label
                        htmlFor="memory-visibility"
                        className="block font-medium"
                        style={{ color: "#0D0000" }}
                    >
                        Quem pode ver minhas memórias?
                    </Label>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="memory-public"
                                name="memory-visibility"
                                value="public"
                                defaultChecked
                                className="form-radio"
                                style={{
                                    accentColor: "#403E34",
                                }}
                            />
                            <Label
                                htmlFor="memory-public"
                                style={{ color: "#737065" }}
                            >
                                Público (Qualquer um pode
                                ver)
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="memory-friends"
                                name="memory-visibility"
                                value="friends"
                                className="form-radio"
                                style={{
                                    accentColor: "#403E34",
                                }}
                            />
                            <Label
                                htmlFor="memory-friends"
                                style={{ color: "#737065" }}
                            >
                                Amigos (Apenas seus amigos
                                podem ver)
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="memory-private"
                                name="memory-visibility"
                                value="private"
                                className="form-radio"
                                style={{
                                    accentColor: "#403E34",
                                }}
                            />
                            <Label
                                htmlFor="memory-private"
                                style={{ color: "#737065" }}
                            >
                                Somente Eu (Privado)
                            </Label>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="add-friends"
                        defaultChecked
                        style={{
                            borderColor: "#737065",
                            backgroundColor: "#403E34",
                        }}
                    />
                    <Label
                        htmlFor="add-friends"
                        style={{ color: "#0D0000" }}
                    >
                        Permitir que outros usuários me
                        adicionem como amigo?
                    </Label>
                </div>
                <Button
                    style={{
                        backgroundColor: "#403E34",
                        color: "#D9D7C5",
                    }}
                >
                    Salvar Preferências
                </Button>
            </div>
        </div>
    );
};
