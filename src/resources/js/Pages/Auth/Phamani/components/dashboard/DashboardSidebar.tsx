import { Plus, Wallet } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '../../ui/Button'
import { Card } from '../../ui/Card'

interface DashboardSidebarProps {
    onNewTransaction: () => void
    onViewAll: () => void
    onPreloadNewTransaction: () => void
}

export function DashboardSidebar({
    onNewTransaction,
    onViewAll,
    onPreloadNewTransaction,
}: DashboardSidebarProps) {
    return (
        <>
            <Button
                variant="primary"
                size="lg"
                className="w-full py-8 text-lg shadow-xl flex flex-col gap-2 rounded-2xl"
                onMouseEnter={onPreloadNewTransaction}
                onFocus={onPreloadNewTransaction}
                onClick={onNewTransaction}
            >
                <Plus className="w-8 h-8" />
                Nova Transação
            </Button>

            {/* Recentes */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#3D2817]">Recentes</h3>
                    <button
                        onClick={onViewAll}
                        className="text-sm text-[#6B4F3A] hover:underline"
                    >
                        Ver tudo
                    </button>
                </div>

                <div className="space-y-3">
                    {[
                        { id: 1, title: 'Supermercado', val: -450.00, date: 'Hoje', icon: '🛒' },
                        { id: 2, title: 'Freelance UI', val: 2500.00, date: 'Ontem', icon: '💻' },
                        { id: 3, title: 'Uber', val: -24.90, date: 'Ontem', icon: '🚗' },
                        { id: 4, title: 'Spotify', val: -21.90, date: '12 Nov', icon: '🎵' },
                    ].map((t) => (
                        <Card
                            key={t.id}
                            className="p-4 flex items-center justify-between hover:bg-[#E8DCC4]/30 transition-colors !shadow-sm !border-0"
                            variant="interactive"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm">
                                    {t.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-[#3D2817] text-sm">{t.title}</p>
                                    <p className="text-xs text-[#8B7355]">{t.date}</p>
                                </div>
                            </div>
                            <span className={`font-bold text-sm ${t.val > 0 ? 'text-[#4A7A5E]' : 'text-[#3D2817]'}`}>
                                {t.val > 0 ? '+' : ''} R$ {Math.abs(t.val).toFixed(2)}
                            </span>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Card */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative h-48 w-full rounded-3xl bg-gradient-to-br from-[#3D2817] to-[#6B4F3A] p-6 text-[#F5EFE6] shadow-2xl overflow-hidden cursor-pointer"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                <div className="flex justify-between items-start mb-8">
                    <span className="text-lg font-bold tracking-wider">Nubank</span>
                    <Wallet className="w-6 h-6 opacity-80" />
                </div>
                <div className="space-y-1 mb-6">
                    <p className="text-xs opacity-70 uppercase tracking-widest">Fatura Atual</p>
                    <h3 className="text-2xl font-bold">R$ 1.250,00</h3>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm opacity-80">**** 4242</p>
                    <p className="text-xs opacity-60">Vence 10/12</p>
                </div>
            </motion.div>
        </>
    )
}
