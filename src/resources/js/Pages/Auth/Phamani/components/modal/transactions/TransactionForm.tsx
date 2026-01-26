import { Layers, Repeat, Users } from 'lucide-react'
import Toggle from '@/Components/Shared/Ui/Toggle'
import { SharedParticipant, Transaction } from '@/Types/Phamani/Transaction'
import { CategoryDropdown } from '@/Pages/Auth/Phamani/components/dropdown/CategoryDropDown'
import { AccountDropdown } from '@/Pages/Auth/Phamani/components/dropdown/AccountDropdown'
import { Form } from '@/Components/Shared/Form/Form'
import { useEnums } from '@/Hooks/useEnums'
import { TransactionTagsField } from '../../field/TransactionTagsField'


interface TransactionFormProps {
    form: any
    categories: any[]
    accounts: any[]
    initialData?: Transaction | null
    onSubmit: () => void
    onCreateCategory: () => void
    onCreateAccount: () => void
}

export function TransactionForm({
    form,
    categories,
    accounts,
    initialData,
    onSubmit,
    onCreateCategory,
    onCreateAccount,
}: TransactionFormProps) {
    const { data, setData, processing, errors } = form
    const { recurringFrequencies } = useEnums()

    const safeCategories = Array.isArray(categories) ? categories : []
    const filteredCategories = safeCategories.filter(
        c => c.type === data.type || c.type === 'both'
    )
    const safeAccounts = Array.isArray(accounts) ? accounts : []

    return (
        <Form
            onSubmit={onSubmit}
            className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-[#F5EFE6]"
        >
            <h2 className="text-2xl font-bold text-[#3D2817] mb-8">
                {initialData ? 'Editar Transação' : 'Nova Transação'}
            </h2>

            <div className="space-y-6">
                {/* Tipo */}
                <div className="flex bg-[#E8DCC4] p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setData('type', 'expense')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all
                    ${data.type === 'expense'
                                ? 'bg-[#FCE7E7] text-[#D4183D] shadow-sm'
                                : 'text-[#6B4E3D] hover:bg-[#D4C5A9]/50'
                            }`}
                    >
                        Despesa
                    </button>

                    <button
                        type="button"
                        onClick={() => setData('type', 'income')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all
                    ${data.type === 'income'
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
                            value={data.amount}
                            onChange={e => setData('amount', Number(e.target.value))}
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
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        placeholder="Ex: Compras do mês"
                        className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4]
                             rounded-xl focus:outline-none focus:border-[#6B4E3D]
                             text-[#3D2817]"
                    />
                </div>

                {/* Categoria / Conta */}
                <div className="grid grid-cols-2 gap-4">
                    <CategoryDropdown
                        value={safeCategories.find(c => c.id === data.category_id) ?? null}
                        categories={filteredCategories}
                        onChange={c => setData('category_id', c.id)}
                        onCreate={onCreateCategory}
                    />

                    <AccountDropdown
                        value={safeAccounts.find(a => a.id === data.account_id) ?? null}
                        accounts={safeAccounts}
                        onChange={a => setData('account_id', a.id)}
                        onCreate={onCreateAccount}
                    />
                </div>
                <TransactionTagsField
                    tags={data.tags}
                    onChange={(tags) => setData('tags', tags)}
                />

                {/* Data */}
                <div>
                    <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">
                        Data
                    </label>

                    <input
                        type="date"
                        value={data.date}
                        onChange={e => setData('date', e.target.value)}
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
                        active={data.is_installment}
                        onToggle={() => {
                            setData('is_installment', !data.is_installment)
                            setData('is_recurring', false) // regra de exclusão
                        }}
                    />

                    {data.is_installment && (
                        <div className="pl-4 border-l-2 border-[#6B4E3D]">
                            <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">
                                Número de Parcelas
                            </label>

                            <input
                                type="number"
                                min={2}
                                value={data.installments_count}
                                onChange={e =>
                                    setData('installments_count', Number(e.target.value))
                                }
                                className="w-full px-4 py-2 bg-white border-2 border-[#E8DCC4]
                 rounded-xl text-[#3D2817]"
                            />
                        </div>
                    )}

                    <Toggle
                        label="Recorrente?"
                        icon={<Repeat className="w-5 h-5" />}
                        active={data.is_recurring}
                        onToggle={() => {
                            setData('is_recurring', !data.is_recurring)
                            setData('is_installment', false) // regra de exclusão
                        }}
                    />


                    {data.is_recurring && (
                        <div className="pl-4 border-l-2 border-[#6B4E3D]">
                            <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">
                                Frequência
                            </label>

                            <select
                                value={data.frequency}
                                onChange={e => setData('frequency', e.target.value)}
                                className="w-full px-4 py-2 bg-white border-2 border-[#E8DCC4] rounded-xl text-[#3D2817]"
                            >
                                {recurringFrequencies.map(freq => (
                                    <option key={freq.value} value={freq.value}>
                                        {freq.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <Toggle
                        label="Compartilhada?"
                        icon={<Users className="w-5 h-5" />}
                        active={data.is_shared}
                        onToggle={() => {
                            const next = !data.is_shared
                            setData('is_shared', next)

                            if (next && data.shared_participants.length === 0) {
                                setData('shared_participants', [
                                    { name: '', percentage: 0 },
                                ])
                            }

                            if (!next) {
                                setData('shared_participants', [])
                            }
                        }}

                    />

                    {data.is_shared && (
                        <div className="pl-4 border-l-2 border-[#6B4E3D] space-y-4">


                            <p className="text-sm font-serif text-[#6B4E3D]">
                                Dividir com
                            </p>

                            <p className="text-xs text-[#8B7355]">
                                Pelo menos uma pessoa é obrigatória
                            </p>

                            {(data.shared_participants as SharedParticipant[]).map(
                                (p: SharedParticipant, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-[#E8DCC4]"
                                    >

                                        <input
                                            type="text"
                                            placeholder="Nome"
                                            value={p.name}
                                            onChange={e => {
                                                const updated = [...data.shared_participants]
                                                updated[index].name = e.target.value
                                                setData('shared_participants', updated)
                                            }}
                                            className="flex-1 px-3 py-2 bg-white border-2 border-[#E8DCC4]
                               rounded-lg text-[#3D2817]"
                                        />

                                        <div className="relative w-24">
                                            <input
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={p.percentage}
                                                onChange={e => {
                                                    const updated = [...data.shared_participants]
                                                    updated[index].percentage = Number(e.target.value)
                                                    setData('shared_participants', updated)
                                                }}
                                                className="w-full pr-6 px-3 py-2 bg-white border-2 border-[#E8DCC4]
               rounded-lg text-[#3D2817]"
                                            />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8B7355]">
                                                %
                                            </span>
                                        </div>


                                        <button
                                            type="button"
                                            disabled={data.shared_participants.length === 1}
                                            onClick={() => {
                                                const updated = data.shared_participants.filter(
                                                    (_: SharedParticipant, i: number) => i !== index
                                                )
                                                setData('shared_participants', updated)
                                            }}
                                            className={`transition ${data.shared_participants.length === 1
                                                ? 'text-[#D4C5A9] cursor-not-allowed'
                                                : 'text-[#8B7355] hover:text-[#D4183D]'
                                                }`}
                                            title={
                                                data.shared_participants.length === 1
                                                    ? 'É necessário ao menos uma pessoa'
                                                    : 'Remover'
                                            }
                                        >
                                            ×
                                        </button>

                                    </div>
                                ))}

                            <button
                                type="button"
                                onClick={() =>
                                    setData('shared_participants', [
                                        ...data.shared_participants,
                                        { name: '', percentage: 0 }
                                    ])
                                }
                                className="text-sm text-[#6B4E3D] hover:underline"
                            >
                                + Adicionar pessoa
                            </button>

                            {/* Feedback visual simples */}
                            {/* {data.is_shared && (
                                <div className="mt-4 text-xs text-[#6B4E3D] space-y-1">
                                    {data.shared_participants.map((p: SharedParticipant, i: number) => (
                                        <div key={i} className="flex justify-between">
                                            <span>{p.name}</span>
                                            <span>
                                                {p.mode === 'percentage'
                                                    ? `${p.value}%`
                                                    : `R$ ${p.value.toFixed(2)}`}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )} */}

                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-4 bg-[#3D2817] text-[#F5EFE6] rounded-xl
                           hover:bg-[#543924] transition-colors font-medium text-lg
                           shadow-lg mt-8 disabled:opacity-50"
                >
                    {initialData ? 'Atualizar Transação' : 'Salvar Transação'}
                </button>
            </div>
        </Form>
    )
}
