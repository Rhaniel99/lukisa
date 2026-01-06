interface SocialNotificationProps {
    avatarUrl: string;
    userName: string;
    actionType?: "like" | "comment";
    message?: string;
    link?: string;
    memoryThumbnail?: string;
    onClose?: () => void;
}


export default function SocialNotification({
    avatarUrl,
    userName,
    actionType = "like",
    message = "curtiu sua memória",
    link,
    memoryThumbnail,
    onClose,
}: SocialNotificationProps) {
    return (
        <div className="pointer-events-auto flex w-full max-w-sm gap-3 rounded-xl border border-[#D4C5A9] bg-[#F5EFE6] p-3 shadow-lg relative overflow-hidden">

            {/* Accent */}
            <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${actionType === "like" ? "bg-[#A65D57]" : "bg-[#6B4E3D]"
                    }`}
            />

            {/* Avatar */}
            <div className="relative shrink-0 ml-2">
                <img
                    src={avatarUrl}
                    alt={userName}
                    className="h-10 w-10 rounded-full object-cover border border-[#D4C5A9]"
                />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#3D2817] truncate">
                    {userName}
                </p>
                <p className="text-xs text-[#8B7355] truncate mt-0.5">
                    {message}
                </p>
            </div>

            {/* Thumbnail clicável */}
            {memoryThumbnail && link && (
                <button
                    onClick={() => (window.location.href = link)}
                    className="shrink-0"
                >
                    <img
                        src={memoryThumbnail}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover border border-[#D4C5A9] hover:opacity-90 transition"
                    />
                </button>
            )}

            {/* Fechar */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose?.();
                }}
                className="p-1 rounded-full hover:bg-[#E8DFD0]"
            >
                ✕
            </button>
        </div>
    );
}
