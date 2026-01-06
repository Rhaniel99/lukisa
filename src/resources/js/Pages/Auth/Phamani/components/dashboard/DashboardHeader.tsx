import { Wallet, Bell, Search, ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { useAuth } from '@/Hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'

interface DashboardHeaderProps {
    title: string
    subtitle?: string
    onBack?: () => void
}

export function DashboardHeader({
    title,
    subtitle,
    onBack,
}: DashboardHeaderProps) {
    const { avatarUrl, username } = useAuth();

    return (
        <header className="flex items-center justify-between mb-10 px-0">
            {/* Left */}
            <div className="flex items-center gap-4">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-xl border-2 border-transparent
                       hover:border-[#E8DCC4] text-[#6B4F3A]
                       hover:bg-[#E8DCC4] transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                )}

                <div className="w-12 h-12 bg-[#6B4F3A] rounded-2xl
                        flex items-center justify-center
                        shadow-lg text-[#F5EFE6]">
                    <Wallet className="w-6 h-6" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-[#3D2817]">{title}</h1>
                    {subtitle && (
                        <p className="text-[#8B7355] text-sm">{subtitle}</p>
                    )}
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                <div
                    className="hidden md:flex items-center gap-2 bg-white px-4 py-2
                     rounded-xl border border-[#E8DCC4]
                     focus-within:border-[#6B4F3A] transition-colors"
                >
                    <Search className="w-4 h-4 text-[#8B7355]" />
                    <input
                        type="text"
                        placeholder="Buscar transações..."
                        className="bg-transparent border-none focus:outline-none
                       text-sm placeholder:text-[#D4C5A9]
                       w-64 text-[#3D2817]"
                    />
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white border border-[#E8DCC4]
                     rounded-xl text-[#6B4F3A]
                     hover:bg-[#FBF7F1] transition-colors relative"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2
                           bg-[#D4183D] rounded-full
                           border border-white" />
                </motion.button>

                <Avatar className="h-12 w-12 border-2 border-[#E8DCC4]">
                    <AvatarImage src={avatarUrl ?? undefined} />
                    <AvatarFallback>
                        {username?.charAt(0).toUpperCase() ?? 'U'}
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}
