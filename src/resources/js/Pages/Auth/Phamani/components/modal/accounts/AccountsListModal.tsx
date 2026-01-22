import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog'
import { Wallet } from 'lucide-react'
import { Account } from '@/Types/Phamani'

interface AccountsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  accounts: Account[]
}

export function AccountsListModal({
  open,
  onOpenChange,
  accounts,
}: AccountsModalProps) {
  const totalBalance = accounts.reduce(
    (sum, acc) => sum + Number(acc.balance),
    0
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-lg bg-[#F5EFE6] border-[#E8DCC4] p-0 overflow-hidden">

        {/* HEADER */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#E8DCC4]">
          <DialogTitle className="text-[#3D2817] text-xl">
            Minhas Contas
          </DialogTitle>

          <p className="text-sm text-[#8B7355] mt-1">
            {accounts.length} contas · Saldo total{' '}
            <span className="font-semibold text-[#3D2817]">
              R$ {totalBalance.toFixed(2)}
            </span>
          </p>
        </DialogHeader>

        {/* LISTA */}
        <div className="max-h-[65vh] overflow-y-auto px-4 py-4 space-y-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 rounded-2xl
                         bg-white border border-[#E8DCC4]
                         hover:bg-[#E8DCC4]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3D2817]/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[#3D2817]" />
                </div>

                <div>
                  <p className="font-semibold text-sm text-[#3D2817]">
                    {account.name}
                  </p>
                  <p className="text-xs text-[#8B7355] capitalize">
                    {account.type === 'checking' && 'Conta Corrente'}
                    {account.type === 'cash' && 'Dinheiro'}
                    {account.type === 'credit' && 'Crédito'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-[#8B7355] uppercase">
                  Saldo
                </p>
                <p
                  className={`font-bold text-sm ${Number(account.balance) < 0
                      ? 'text-[#B91C1C]'
                      : 'text-[#3D2817]'
                    }`}
                >
                  R$ {Number(account.balance).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
