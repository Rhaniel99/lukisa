import { useState } from 'react'
import { X, Calendar, Layers, Repeat, Receipt } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import * as Icons from 'lucide-react'

import { Transaction } from '@/Types/Phamani/Transaction'
import { Account, Category } from '@/Types/Phamani'

import { CategoryDropdown } from '../dropdown/CategoryDropDown'
import { AccountDropdown } from '../dropdown/AccountDropdown'
import { CreateAccountDrawer } from '../drawer/CreateAccountDrawer'
import { CreateCategoryDrawer } from '../drawer/CreateCategoryDrawer'

import {
  TransactionFormProvider,
  useTransactionForm,
} from '../../contexts/TransactionFormContext'
import Toggle from '@/Components/Shared/Ui/Toggle'

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface NewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: any) => void
  categories: Category[]
  accounts: Account[]
  initialData?: Transaction | null
}

/* -------------------------------------------------------------------------- */
/*                              PUBLIC COMPONENT                              */
/* -------------------------------------------------------------------------- */

export function NewTransactionModal(props: NewTransactionModalProps) {
  const { isOpen, categories, accounts, initialData } = props

  return (
    <AnimatePresence>
      {isOpen && (
        <TransactionFormProvider
          categories={categories}
          accounts={accounts}
          initialData={initialData}
        >
          <ModalContent {...props} />
        </TransactionFormProvider>
      )}
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------------- */
/*                                MODAL BODY                                  */
/* -------------------------------------------------------------------------- */

function ModalContent({
  onClose,
  onSave,
  initialData,
}: Pick<NewTransactionModalProps, 'onClose' | 'onSave' | 'initialData'>) {
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
    reset,
  } = useTransactionForm()

  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false)
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false)

  function handleSave() {
    if (!category || !account) return

    onSave({
      description,
      amount: Number(amount),
      type,
      category_id: category.id,
      account_id: account.id,
      date,
      isInstallment,
      installments: isInstallment
        ? { current: 1, total: installmentsCount }
        : undefined,
      isRecurring,
      frequency: isRecurring ? frequency : undefined,
    })

    reset()
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#3D2817]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#F5EFE6] rounded-[2rem] shadow-2xl w-full max-w-5xl h-[85vh]
                     overflow-hidden flex flex-col md:flex-row relative border-2 border-[#E8DCC4]"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 text-[#6B4E3D] hover:text-[#3D2817]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* ------------------------------------------------------------------ */}
          {/*                               FORM                                 */}
          {/* ------------------------------------------------------------------ */}

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
                    ${
                      type === 'expense'
                        ? 'bg-[#FCE7E7] text-[#D4183D] shadow-sm'
                        : 'text-[#6B4E3D] hover:bg-[#D4C5A9]/50'
                    }`}
                >
                  Despesa
                </button>

                <button
                  onClick={() => setType('income')}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all
                    ${
                      type === 'income'
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
                  onCreate={() => setCategoryDrawerOpen(true)}
                />

                <AccountDropdown
                  value={account}
                  accounts={accounts}
                  onChange={setAccount}
                  onCreate={() => setAccountDrawerOpen(true)}
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

          {/* ------------------------------------------------------------------ */}
          {/*                              PREVIEW                               */}
          {/* ------------------------------------------------------------------ */}

          <div className="hidden md:flex w-1/2 bg-[#E8DCC4]/50 border-l-2 border-[#D4C5A9]
                          flex-col items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4C5A9]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6B4E3D]/10 rounded-full blur-3xl" />

            <p className="text-[#6B4E3D] font-bold tracking-widest uppercase mb-8 z-10 text-sm mt-12">
              Live Preview
            </p>

            <motion.div
              key={type}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm bg-[#F5EFE6] rounded-[2rem]
                         shadow-2xl border border-[#fff]/50 p-8 z-10"
            >
              <div className="flex justify-between items-start mb-8">
                <div
                  className={`p-4 rounded-2xl ${
                    type === 'income'
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
                  className={`text-4xl font-bold ${
                    type === 'income'
                      ? 'text-[#1F5428]'
                      : 'text-[#D4183D]'
                  }`}
                >
                  {type === 'expense' ? '-' : '+'} R${' '}
                  {Number(amount).toFixed(2) || '0.00'}
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
                      {description || 'Sem descrição'}
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
                      {new Date(date).toLocaleDateString('pt-BR')}
                    </p>
                    {isRecurring && (
                      <p className="text-[#8B7355] text-xs">
                        Repete {frequency}
                      </p>
                    )}
                    {isInstallment && (
                      <p className="text-[#8B7355] text-xs">
                        Parcela 1 de {installmentsCount}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <CreateAccountDrawer
        isOpen={accountDrawerOpen}
        onClose={() => setAccountDrawerOpen(false)}
        onCreate={() => setAccountDrawerOpen(false)}
      />

      <CreateCategoryDrawer
        isOpen={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
        onCreate={() => setCategoryDrawerOpen(false)}
      />
    </>
  )
}
