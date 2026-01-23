import { Calendar, Receipt } from 'lucide-react'
import { motion } from 'motion/react'
import * as Icons from 'lucide-react'
import { useEnums } from '@/Hooks/useEnums'
import { getInstallmentValue } from '@/Pages/Auth/Phamani/utils/transactionMath'
import { getNextTransactionDate } from '../../../utils/transactionDates'
import { resolveEnumLabel } from '@/Utils/enumHelpers'

interface TransactionPreviewProps {
    form: {
        data: any
    }
}

export function TransactionPreview({ form }: TransactionPreviewProps) {
    const { recurringFrequencies } = useEnums()
    const { data } = form
    const category = data.category
    const account = data.account
    const amount = Number(data.amount || 0)
    const installmentValue = getInstallmentValue(amount, data.installments_count)
    const nextDate = getNextTransactionDate(data)
    const frequencyLabel = resolveEnumLabel(recurringFrequencies, data.frequency)

    return (
        <div className="hidden md:flex w-1/2 bg-[#E8DCC4]/50 border-l-2 border-[#D4C5A9]
                          flex-col items-center justify-center p-12 relative overflow-hidden">
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
                <div className="flex justify-between items-start mb-8">
                    <div
                        className={`p-4 rounded-2xl ${data.type === 'income'
                            ? 'bg-[#E3F9E5] text-[#1F5428]'
                            : 'bg-[#FCE7E7] text-[#D4183D]'
                            }`}
                    >
                        <Receipt className="w-8 h-8" />
                    </div>

                    <div className="text-right">
                        <p className="text-[#8B7355] text-sm font-medium mb-1">
                            {account?.name}
                        </p>
                        <p className="text-[#3D2817] font-bold text-xs uppercase opacity-60">
                            Conta
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-[#8B7355] text-sm mb-2 font-medium">Valor</p>
                    <h3
                        className={`text-4xl font-bold ${data.type === 'income'
                            ? 'text-[#1F5428]'
                            : 'text-[#D4183D]'
                            }`}
                    >
                        {data.type === 'expense' ? '-' : '+'} R${' '}
                        {Number(data.amount).toFixed(2) || '0.00'}
                    </h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-[#fff]/50 rounded-xl">
                        {category ? (
                            <div
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: category.color }}
                            >
                                {(() => {
                                    const Icon =
                                        (Icons as any)[category.icon] ?? Icons.Tag
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
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-[#fff]/50 rounded-xl">
                        <div className="p-2 bg-[#E8DCC4] rounded-lg text-[#6B4E3D]">
                            <Calendar className="w-5 h-5" />
                        </div>

                        <div>
                            <p className="text-[#3D2817] font-bold text-sm">
                                {new Date(data.date).toLocaleDateString('pt-BR') ?? '—'}
                            </p>
                            {data.is_recurring && (
                                <>
                                    <p className="text-[#8B7355] text-xs">
                                        Repete {frequencyLabel}
                                    </p>
                                    <p className="text-[#6B4E3D] text-xs font-medium">
                                        Próxima: {nextDate}
                                    </p>
                                </>
                            )}
                            {data.is_installment && (
                                <>
                                    <p className="text-[#8B7355] text-xs">
                                        Parcela 1 de {data.installments_count}
                                    </p>
                                    <p className="text-[#8B7355] text-xs">
                                        R$ {installmentValue?.toFixed(2)} por parcela
                                    </p>
                                    <p className="text-[#6B4E3D] text-xs font-medium">
                                        Próxima: {nextDate}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

