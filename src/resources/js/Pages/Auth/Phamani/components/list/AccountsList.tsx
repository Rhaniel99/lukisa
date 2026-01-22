import { Wallet } from 'lucide-react'
import { motion } from 'motion/react'
import { Account } from '@/Types/Phamani'

interface AccountsListProps {
  accounts: Account[]
  onViewAll?: () => void
  limit?: number
}

export function AccountsList({
  accounts,
  onViewAll,
  limit = 2,
}: AccountsListProps) {

  const sorted = [...accounts].sort((a, b) => Number(b.balance) - Number(a.balance))
  const visibleAccounts = sorted.slice(0, limit)
  const hasMore = accounts.length > limit
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#3D2817]">Contas</h3>
        {hasMore && onViewAll && (
          <button onClick={onViewAll} className="text-sm text-[#6B4F3A] hover:underline">
            Ver todas
          </button>
        )}
      </div>

      <div className="space-y-3">
        {visibleAccounts.map((account) => (
          <motion.div
            key={account.id}
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 rounded-2xl
                       bg-gradient-to-br from-[#3D2817] to-[#6B4F3A]
                       text-[#F5EFE6] shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 opacity-90" />
              </div>

              <div>
                <p className="font-bold text-sm">{account.name}</p>
                <p className="text-xs opacity-70 capitalize">
                  {account.type === 'checking' && 'Conta Corrente'}
                  {account.type === 'cash' && 'Dinheiro'}
                  {account.type === 'credit' && 'Crédito'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] opacity-60 uppercase">Saldo</p>
              <p className="font-bold text-sm">
                R$ {Number(account.balance).toFixed(2)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Caso queira um botão centralizado embaixo (opcional) */}
      {!hasMore && onViewAll && (
        <button
          onClick={onViewAll}
          className="text-sm text-[#6B4F3A] hover:underline w-full text-center pt-1"
        >
          Ver todas as contas
        </button>
      )}
    </div>
  )
}
