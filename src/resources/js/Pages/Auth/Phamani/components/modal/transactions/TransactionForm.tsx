import { Layers, Repeat } from 'lucide-react'
import Toggle from '@/Components/Shared/Ui/Toggle'
import { CreateTransaction, Transaction } from '@/Types/Phamani/Transaction'
import { useTransactionForm } from '@/Pages/Auth/Phamani/contexts/TransactionFormContext'
import { CategoryDropdown } from '@/Pages/Auth/Phamani/components/dropdown/CategoryDropDown'
import { AccountDropdown } from '@/Pages/Auth/Phamani/components/dropdown/AccountDropdown'

export function TransactionForm({
    initialData,
    onSave,
    onCreateCategory,
    onCreateAccount,
}: {
    initialData?: Transaction | null
    onSave: (data: CreateTransaction) => void
    onCreateCategory: () => void
    onCreateAccount: () => void
}) {
    const {
        description,
        setDescription,
        amount,
        setAmount,
        type,
        setType,
        category,
        setCategory,
        account,
        setAccount,
        date,
        setDate,
        filteredCategories,
        accounts,
        isInstallment,
        setIsInstallment,
        installmentsCount,
        setInstallmentsCount,
        isRecurring,
        setIsRecurring,
        frequency,
        setFrequency,
    } = useTransactionForm()

    function handleSave() {
        if (!category || !account) return

        onSave({
            description,
            amount: Number(amount),
            type,
            category_id: category.id,
            account_id: account.id,
            date,
        })
    }

    return (
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-[#F5EFE6]">
            <h2 className="text-2xl font-bold text-[#3D2817] mb-8">
                {initialData ? 'Editar Transação' : 'Nova Transação'}
            </h2>

            <div className="space-y-6">
                {/* Tipo */}
                <div className="flex bg-[#E8DCC4] p-1 rounded-xl">
                    <button
                        onClick={() => setType('expense')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all
                    ${type === 'expense'
                                ? 'bg-[#FCE7E7] text-[#D4183D] shadow-sm'
                                : 'text-[#6B4E3D] hover:bg-[#D4C5A9]/50'
                            }`}
                    >
                        Despesa
                    </button>

                    <button
                        onClick={() => setType('income')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all
                    ${type === 'income'
                                ? 'bg-[#E3F9E5] text-[#1F5428] shadow-sm'
                                : 'text-[#6B4E3D] hover:bg-[#D4C5A9]/50'
                            }`}
                    >
                        Receita
                    </button>
                </div>

                {/* Valor */}
                <div>
                    <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">
                        Valor
                    </label>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355] font-bold">
                            R$
                        </span>

                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0,00"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#E8DCC4]
                               rounded-xl focus:outline-none focus:border-[#6B4E3D]
                               text-2xl font-bold text-[#3D2817]
                               placeholder:text-[#D4C5A9]"
                        />
                    </div>
                </div>

                {/* Descrição */}
                <div>
                    <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">
                        Descrição
                    </label>

                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Ex: Compras do mês"
                        className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4]
                             rounded-xl focus:outline-none focus:border-[#6B4E3D]
                             text-[#3D2817]"
                    />
                </div>

                {/* Categoria / Conta */}
                <div className="grid grid-cols-2 gap-4">
                    <CategoryDropdown
                        value={category}
                        categories={filteredCategories}
                        onChange={setCategory}
                        onCreate={onCreateCategory}
                    />

                    <AccountDropdown
                        value={account}
                        accounts={accounts}
                        onChange={setAccount}
                        onCreate={onCreateAccount}
                    />

                </div>

                {/* Data */}
                <div>
                    <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">
                        Data
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4]
                             rounded-xl focus:outline-none focus:border-[#6B4E3D]
                             text-[#3D2817]"
                    />
                </div>

                {/* Opções Avançadas */}
                <div className="space-y-4 pt-4 border-t border-[#E8DCC4]">
                    <Toggle
                        label="Parcelado?"
                        icon={<Layers className="w-5 h-5" />}
                        active={isInstallment}
                        onToggle={() => {
                            setIsInstallment(!isInstallment)
                            setIsRecurring(false)
                        }}
                    />

                    {isInstallment && (
                        <div className="pl-4 border-l-2 border-[#6B4E3D]">
                            <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">
                                Número de Parcelas
                            </label>

                            <input
                                type="number"
                                min={2}
                                value={installmentsCount}
                                onChange={e =>
                                    setInstallmentsCount(Number(e.target.value))
                                }
                                className="w-full px-4 py-2 bg-white border-2 border-[#E8DCC4]
                                 rounded-xl text-[#3D2817]"
                            />
                        </div>
                    )}

                    <Toggle
                        label="Recorrente?"
                        icon={<Repeat className="w-5 h-5" />}
                        active={isRecurring}
                        onToggle={() => {
                            setIsRecurring(!isRecurring)
                            setIsInstallment(false)
                        }}
                    />

                    {isRecurring && (
                        <div className="pl-4 border-l-2 border-[#6B4E3D]">
                            <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">
                                Frequência
                            </label>

                            <select
                                value={frequency}
                                onChange={e => setFrequency(e.target.value)}
                                className="w-full px-4 py-2 bg-white border-2 border-[#E8DCC4]
                                 rounded-xl text-[#3D2817]"
                            >
                                <option value="diario">Diário</option>
                                <option value="semanal">Semanal</option>
                                <option value="mensal">Mensal</option>
                                <option value="anual">Anual</option>
                            </select>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleSave}
                    disabled={!amount || !description}
                    className="w-full py-4 bg-[#3D2817] text-[#F5EFE6] rounded-xl
                           hover:bg-[#543924] transition-colors font-medium text-lg
                           shadow-lg mt-8 disabled:opacity-50"
                >
                    {initialData ? 'Atualizar Transação' : 'Salvar Transação'}
                </button>
            </div>
        </div>
    )
}
