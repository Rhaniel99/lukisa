import { Calendar, Receipt, Users } from 'lucide-react'
import { motion } from 'motion/react'
import * as Icons from 'lucide-react'
import { useEnums } from '@/Hooks/useEnums'
import {
  getInstallmentValue,
  getSharedInstallmentValue,
  getSharedUserAmount,
  splitSharedAmounts,
} from '@/Pages/Auth/Phamani/utils/transactionMath'
import { getNextTransactionDate } from '../../../utils/transactionDates'
import { resolveEnumLabel } from '@/Utils/enumHelpers'

interface TransactionPreviewProps {
  data: any
  categories: any[]
  accounts: any[]
}

export function TransactionPreview({ data, categories, accounts }: TransactionPreviewProps) {
  const { recurringFrequencies } = useEnums()

  if (!Array.isArray(categories) || !Array.isArray(accounts)) return null

  const safeCategories = categories ?? []
  const safeAccounts = accounts ?? []

  const category = safeCategories.find((c) => c.id === data.category_id)
  const account = safeAccounts.find((a) => a.id === data.account_id)

  const tags = data.tags ?? []

  const amount = Number(data.amount || 0)
  const participants = Array.isArray(data.shared_participants) ? data.shared_participants : []
  const isShared = !!data.is_shared
  const isInstallment = !!data.is_installment

  const originalInstallment = isInstallment
    ? getInstallmentValue(amount, data.installments_count)
    : null

  const sharedAmount = isShared ? getSharedUserAmount(amount, participants) : amount

  const sharedInstallment = isInstallment
    ? getSharedInstallmentValue(amount, data.installments_count, participants)
    : null

  const nextDate = getNextTransactionDate(data)
  const frequencyLabel = resolveEnumLabel(recurringFrequencies, data.frequency)

  // ✅ divisão baseada em centavos (você + participantes)
  const split = isShared ? splitSharedAmounts(amount, participants) : null
  const participantsCount = participants.length
  const totalPeople = participantsCount + 1

  return (
    <div
      className="hidden md:flex w-1/2 bg-[#E8DCC4]/50 border-l-2 border-[#D4C5A9]
                 flex-col items-center justify-center p-12 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4C5A9]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6B4E3D]/10 rounded-full blur-3xl" />

      <p className="text-[#6B4E3D] font-bold tracking-widest uppercase mb-8 z-10 text-sm mt-12">
        Live Preview
      </p>

      <motion.div
        key={data.type}
        initial={{ scale: 0.95, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-[#F5EFE6] rounded-[2rem]
                   shadow-2xl border border-[#fff]/50 p-8 z-10"
      >
        {/* header */}
        <div className="flex justify-between items-start mb-8">
          <div
            className={`p-4 rounded-2xl ${
              data.type === 'income'
                ? 'bg-[#E3F9E5] text-[#1F5428]'
                : 'bg-[#FCE7E7] text-[#D4183D]'
            }`}
          >
            <Receipt className="w-8 h-8" />
          </div>

          <div className="text-right">
            <p className="text-[#8B7355] text-sm font-medium mb-1">
              {account?.name ?? '—'}
            </p>
            <p className="text-[#3D2817] font-bold text-xs uppercase opacity-60">
              Conta
            </p>
          </div>
        </div>

        {/* valor */}
        <div className="mb-6">
          <p className="text-[#8B7355] text-sm mb-2 font-medium">Valor</p>

          <h3
            className={`text-4xl font-bold ${
              data.type === 'income' ? 'text-[#1F5428]' : 'text-[#D4183D]'
            }`}
          >
            {data.type === 'expense' ? '-' : '+'} R$ {sharedAmount.toFixed(2)}
          </h3>

          {isShared && (
            <p className="text-xs text-[#8B7355] mt-2">
              Total original: R$ {amount.toFixed(2)}
            </p>
          )}
        </div>

        {/* ✅ bloco de compartilhamento (independente de parcelado) */}
        {isShared && participantsCount > 0 && split && (
          <div className="mb-6 p-3 bg-[#fff]/50 rounded-xl border border-[#E8DCC4]">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-[#E8DCC4] rounded-lg text-[#6B4E3D]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#3D2817]">Compartilhamento</p>
                <p className="text-[11px] text-[#8B7355]">
                  {participantsCount} participante(s) • {totalPeople} pessoas no total
                </p>
              </div>
            </div>

            <div className="space-y-1">
              {participants.map((p: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-[#6B4E3D]">
                    {p?.name?.trim() ? p.name : `Pessoa ${i + 1}`}
                  </span>

                  <span className="text-[#8B7355] tabular-nums">
                    {split.participantPct.toFixed(2).replace('.', ',')}% • R$ {split.participantAmount.toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between text-xs pt-2 mt-2 border-t border-[#E8DCC4]">
                <span className="text-[#3D2817] font-semibold">Você</span>
                <span className="text-[#6B4E3D] font-semibold tabular-nums">
                  {split.userPct.toFixed(2).replace('.', ',')}% • R$ {split.userAmount.toFixed(2)}
                </span>
              </div>

              <p className="text-[11px] text-[#8B7355] mt-2">
                Divisão igual (em centavos). Diferença de centavos fica com você.
              </p>
            </div>
          </div>
        )}

        {/* infos */}
        <div className="space-y-4">
          {/* categoria/descrição */}
          <div className="flex items-center gap-4 p-3 bg-[#fff]/50 rounded-xl">
            {category ? (
              <div className="p-2 rounded-lg" style={{ backgroundColor: category.color }}>
                {(() => {
                  const Icon = (Icons as any)[category.icon] ?? Icons.Tag
                  return <Icon className="w-5 h-5 text-white" />
                })()}
              </div>
            ) : (
              <div className="p-2 bg-[#E8DCC4] rounded-lg">
                <Receipt className="w-5 h-5 text-[#6B4E3D]" />
              </div>
            )}

            <div>
              <p className="text-[#3D2817] font-bold text-sm">
                {data.description || 'Sem descrição'}
              </p>
              <p className="text-[#8B7355] text-xs">
                {category?.name ?? 'Sem categoria'}
              </p>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tags.map((tag: { name: string }, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded-full text-xs bg-[#E8DCC4] text-[#6B4E3D]"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* data/recorrência/parcelas */}
          <div className="flex items-center gap-4 p-3 bg-[#fff]/50 rounded-xl">
            <div className="p-2 bg-[#E8DCC4] rounded-lg text-[#6B4E3D]">
              <Calendar className="w-5 h-5" />
            </div>

            <div>
              <p className="text-[#3D2817] font-bold text-sm">
                {data.date ? new Date(data.date).toLocaleDateString('pt-BR') : '—'}
              </p>

              {data.is_recurring && (
                <>
                  <p className="text-[#8B7355] text-xs">Repete {frequencyLabel}</p>
                  <p className="text-[#6B4E3D] text-xs font-medium">
                    Próxima: {nextDate}
                  </p>
                </>
              )}

              {isInstallment && (
                <div className="mt-2 space-y-1">
                  <p className="text-[#3D2817] text-xs font-semibold">
                    Parcela 1 de {data.installments_count}
                  </p>

                  <div className="text-xs text-[#8B7355]">
                    Original: R$ {originalInstallment?.toFixed(2)}
                  </div>

                  {isShared && (
                    <div className="text-xs font-medium text-[#6B4E3D]">
                      Sua parcela: R$ {sharedInstallment?.toFixed(2)}
                    </div>
                  )}

                  <div className="text-xs text-[#6B4E3D]">Próxima: {nextDate}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}