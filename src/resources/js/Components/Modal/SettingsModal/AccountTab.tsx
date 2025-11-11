import { AuthUser as UserData } from "@/Types/models";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

interface AccountTabProps {
    user: UserData;
}

export const AccountTab = ({ user }: AccountTabProps) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: "#0D0000" }}>
                Configurações da Conta
            </h3>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label
                        htmlFor="account-email"
                        style={{ color: "#0D0000" }}
                    >
                        Email
                    </Label>
                    <Input
                        id="account-email"
                        type="email"
                        defaultValue={user.email}
                        className="border-2"
                        style={{ borderColor: "#737065" }}
                    />
                </div>
                <div className="space-y-2">
                    <Label
                        htmlFor="account-password"
                        style={{ color: "#0D0000" }}
                    >
                        Nova Senha
                    </Label>
                    <Input
                        id="account-password"
                        type="password"
                        placeholder="********"
                        className="border-2"
                        style={{ borderColor: "#737065" }}
                    />
                </div>
                <div className="space-y-2">
                    <Label
                        htmlFor="account-confirm-password"
                        style={{ color: "#0D0000" }}
                    >
                        Confirmar Nova Senha
                    </Label>
                    <Input
                        id="account-confirm-password"
                        type="password"
                        placeholder="********"
                        className="border-2"
                        style={{ borderColor: "#737065" }}
                    />
                </div>
                <Button
                    style={{
                        backgroundColor: "#403E34",
                        color: "#D9D7C5",
                    }}
                >
                    Atualizar Conta
                </Button>
            </div>
            <div
                className="border-t pt-6 mt-6"
                style={{ borderColor: "#737065" }}
            >
                <h4
                    className="font-semibold mb-2"
                    style={{ color: "#0D0000" }}
                >
                    Deletar Conta
                </h4>
                <p
                    className="text-sm mb-4"
                    style={{ color: "#737065" }}
                >
                    Esta ação é irreversível. Todas as suas
                    informações serão permanentemente
                    excluídas.
                </p>
                <Button
                    variant="destructive"
                    style={{
                        backgroundColor: "#D9534F",
                        color: "#D9D7C5",
                    }} // A different red for destructive action
                >
                    Deletar Minha Conta
                </Button>
            </div>
        </div>
    );
};
