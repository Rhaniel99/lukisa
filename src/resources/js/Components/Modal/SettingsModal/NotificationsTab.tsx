import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";

export const NotificationsTab = () => {
    return (
        <div className="space-y-6">
            <h3
                className="text-xl font-bold"
                style={{ color: "#0D0000" }}
            >
                Notificações
            </h3>
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="like-notification"
                        defaultChecked
                        style={{
                            borderColor: "#737065",
                            backgroundColor: "#403E34",
                        }}
                    />
                    <Label
                        htmlFor="like-notification"
                        style={{ color: "#0D0000" }}
                    >
                        Quando alguém curte minha memória
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="comment-notification"
                        defaultChecked
                        style={{
                            borderColor: "#737065",
                            backgroundColor: "#403E34",
                        }}
                    />
                    <Label
                        htmlFor="comment-notification"
                        style={{ color: "#0D0000" }}
                    >
                        Quando alguém comenta na minha
                        memória
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="friend-request-notification"
                        style={{
                            borderColor: "#737065",
                            backgroundColor: "#403E34",
                        }}
                    />
                    <Label
                        htmlFor="friend-request-notification"
                        style={{ color: "#0D0000" }}
                    >
                        Quando recebo um pedido de amizade
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="system-updates-notification"
                        defaultChecked
                        style={{
                            borderColor: "#737065",
                            backgroundColor: "#403E34",
                        }}
                    />
                    <Label
                        htmlFor="system-updates-notification"
                        style={{ color: "#0D0000" }}
                    >
                        Atualizações do sistema e Lukisa
                    </Label>
                </div>
                <Button
                    style={{
                        backgroundColor: "#403E34",
                        color: "#D9D7C5",
                    }}
                >
                    Salvar Notificações
                </Button>
            </div>
        </div>
    );
};
