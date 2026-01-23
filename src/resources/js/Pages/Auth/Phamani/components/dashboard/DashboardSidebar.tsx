import { Plus } from 'lucide-react'
import { Button } from '../../ui/Button'
import { Card } from '../../ui/Card'
import { Account, Transaction } from '@/Types/Phamani'
import { AccountsList } from '../list/AccountsList'
import { useState } from 'react'
import { AccountsListModal } from '../modal/accounts/AccountsListModal'
import { router } from '@inertiajs/react'
import * as Icons from 'lucide-react'
import { CATEGORY_ICON_MAP } from '@/Lib/category/icons'

interface DashboardSidebarProps {
    recentTransactions: Transaction[]
    accounts: Account[]
    onNewTransaction: () => void
    onPreloadNewTransaction: () => void
}

export function DashboardSidebar({
    recentTransactions,
    accounts,
    onNewTransaction,
    onPreloadNewTransaction,
}: DashboardSidebarProps) {
    const [accountsModalOpen, setAccountsModalOpen] = useState(false)

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
                        onClick={() => router.visit(route('transaction.index'))}
                        className="text-sm text-[#6B4F3A] hover:underline"
                    >
                        Ver tudo
                    </button>
                </div>

                <div className="space-y-3">
                    {recentTransactions.map((t) => {
                        const Icon =
                            t.category?.icon
                                ? CATEGORY_ICON_MAP[t.category.icon as keyof typeof CATEGORY_ICON_MAP]
                                : null


                        return (
                            <Card
                                key={t.id}
                                className="p-4 flex items-center justify-between
                                    hover:bg-[#E8DCC4]/30 transition-colors
                                    !shadow-sm !border-0"
                                variant="interactive"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                                        style={{
                                            backgroundColor: t.category?.color
                                                ? t.category.color
                                                : '#E8DCC4',
                                        }}
                                    >
                                        {Icon ? (
                                            <Icon className="w-5 h-5 text-white" />
                                        ) : (
                                            <Icons.Tag className="w-5 h-5 text-white" />
                                        )}
                                    </div>

                                    <div>
                                        <p className="font-bold text-[#3D2817] text-sm">
                                            {t.name}
                                        </p>
                                        <p className="text-xs text-[#8B7355]">
                                            {new Date(t.date).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`font-bold text-sm ${t.type === 'income'
                                        ? 'text-[#4A7A5E]'
                                        : 'text-[#3D2817]'
                                        }`}
                                >
                                    {t.type === 'income' ? '+' : '-'} R$ {Number(t.amount).toFixed(2)}
                                </span>
                            </Card>
                        )
                    })}

                </div>
            </div>

            {/* Card */}
            <AccountsList
                accounts={accounts}
                onViewAll={() => setAccountsModalOpen(true)}
            />

            <AccountsListModal
                open={accountsModalOpen}
                onOpenChange={setAccountsModalOpen}
                accounts={accounts}
            />
        </>
    )
}
