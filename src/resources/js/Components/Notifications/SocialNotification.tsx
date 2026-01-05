interface SocialNotificationProps {
    avatarUrl: string;
    userName: string;
    actionType?: "like" | "comment"; // Para customizar ícone/texto se quiser expandir depois
    message?: string;
    onClose?: () => void;
}

export default function SocialNotification({ 
    avatarUrl, 
    userName, 
    actionType = "like", 
    message = "curtiu sua memória", 
    onClose 
}: SocialNotificationProps) {
    return (
        <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-[#D4C5A9] bg-[#F5EFE6] p-3 shadow-lg transition-all hover:shadow-xl relative overflow-hidden">
            
            {/* Barra lateral de sotaque (Accent) */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${actionType === 'like' ? 'bg-[#A65D57]' : 'bg-[#6B4E3D]'}`} />

            {/* Avatar com Badge */}
            <div className="relative shrink-0 ml-2">
                <img 
                    src={avatarUrl} 
                    alt={userName} 
                    className="h-10 w-10 rounded-full object-cover border border-[#D4C5A9]"
                />
                {/* Badge do ícone (Coração) */}
                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F5EFE6] ring-1 ring-[#D4C5A9]">
                    <svg className="h-3 w-3 text-[#A65D57] fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </div>

            {/* Texto */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#3D2817] truncate leading-tight">
                    {userName}
                </h4>
                <p className="text-xs text-[#8B7355] truncate leading-tight mt-0.5">
                    {message}
                </p>
            </div>

            {/* Botão Fechar (Discreto) */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onClose?.();
                }}
                className="group p-1 rounded-full hover:bg-[#E8DFD0] transition-colors"
            >
                <svg className="h-4 w-4 text-[#8B7355] group-hover:text-[#3D2817]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}