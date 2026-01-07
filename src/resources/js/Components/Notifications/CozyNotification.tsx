import { useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { PageProps } from "@/Types/Inertia/PageProps";

export default function CozyNotification() {
    const { props } = usePage<PageProps>();
    const { flash, errors } = props;

    const lastFlashRef = useRef<string>("");

    useEffect(() => {
        // Sucesso
        if (flash?.success?.message) {
            const key = `${flash.success.message}-${flash.success.time}`;
            if (key !== lastFlashRef.current) {
                toast.success(flash.success.message);
                lastFlashRef.current = key;
            }
        }

        // Erro
        if (flash?.error?.message) {
            const key = `${flash.error.message}-${flash.error.time}`;
            if (key !== lastFlashRef.current) {
                toast.error(flash.error.message);
                lastFlashRef.current = key;
            }
        }

        // Erros de Validação
        if (errors && Object.keys(errors).length > 0) {
            Object.values(errors).forEach((errMsg) => {
                toast.error(errMsg, { id: errMsg });
            });
        }
    }, [flash?.success, flash?.error, errors]);

    return (
        <Toaster
            position="bottom-right"
            // Define o espaço entre os toasts
            gap={12}
            toastOptions={{
                // Estilo BASE (comum a todos)
                className: "font-sans shadow-lg rounded-xl border border-[#D4C5A9]",
                style: {
                    background: '#F5EFE6', // Fundo Creme Padrão
                    color: '#3D2817',      // Texto Café
                },
                classNames: {
                    // --- ESTILO DE SUCESSO ---
                    // Adiciona uma borda esquerda grossa Marrom Café
                    success: "border-l-[6px] border-l-[#6B4E3D] bg-[#F5EFE6]",

                    // --- ESTILO DE ERRO ---
                    // Adiciona uma borda esquerda grossa Terracota (Vermelho Queimado)
                    // E muda levemente o fundo para um rosado muito pálido para dar ênfase
                    error: "border-l-[6px] border-l-[#A65D57] bg-[#FFF5F5] text-[#8B4543]",

                    // --- ESTILO DE INFO ---
                    info: "border-l-[6px] border-l-[#8B7355] bg-[#F5EFE6]",

                    // Customiza a cor do botão de fechar (se houver) e ícones
                    actionButton: "bg-[#6B4E3D] text-white",
                },
            }}
            // Customizando os ícones para ficarem na paleta
            icons={{
                success: <SuccessIcon />,
                error: <ErrorIcon />,
            }}
        />
    );
}

// --- Componentes de Ícone Customizados para o Tema ---
// Ícones minimalistas que combinam com o design
function SuccessIcon() {
    return (
        <div className="w-5 h-5 rounded-full bg-[#6B4E3D] flex items-center justify-center mr-2">
            <svg className="w-3 h-3 text-[#F5EFE6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>
    );
}

function ErrorIcon() {
    return (
        <div className="w-5 h-5 rounded-full bg-[#A65D57] flex items-center justify-center mr-2">
            <svg className="w-3 h-3 text-[#FFF5F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    );
}