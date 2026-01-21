import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Account, Category } from '@/Types/Phamani'
import { Transaction, TransactionType } from '@/Types/Phamani/Transaction'

interface TransactionFormContextData {
  description: string
  setDescription: (v: string) => void

  amount: string
  setAmount: (v: string) => void

  type: TransactionType
  setType: (t: TransactionType) => void

  category: Category | null
  setCategory: (c: Category | null) => void

  account: Account | null
  setAccount: (a: Account | null) => void

  accounts: Account[]

  date: string
  setDate: (d: string) => void

  filteredCategories: Category[]

  isInstallment: boolean
  setIsInstallment: (v: boolean) => void
  installmentsCount: number
  setInstallmentsCount: (v: number) => void

  isRecurring: boolean
  setIsRecurring: (v: boolean) => void
  frequency: string
  setFrequency: (v: string) => void

  reset: () => void
}

const TransactionFormContext = createContext<TransactionFormContextData | null>(null)

export function useTransactionForm() {
  const ctx = useContext(TransactionFormContext)
  if (!ctx) throw new Error('useTransactionForm must be used inside provider')
  return ctx
}

interface ProviderProps {
  categories: Category[]
  accounts: Account[]
  initialData?: Transaction | null
  children: React.ReactNode
}

export function TransactionFormProvider({
  categories = [],
  accounts = [],
  initialData,
  children,
}: ProviderProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [category, setCategory] = useState<Category | null>(null)
  const [account, setAccount] = useState<Account | null>(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const [isInstallment, setIsInstallment] = useState(false)
  const [installmentsCount, setInstallmentsCount] = useState(2)

  const [isRecurring, setIsRecurring] = useState(false)
  const [frequency, setFrequency] = useState('mensal')

  /** 🔑 regra centralizada */
  const filteredCategories = useMemo(
    () => categories.filter(c => c.type === type || c.type === 'both'),
    [categories, type]
  )

  /** 🔑 invalida categoria ao trocar tipo */
  useEffect(() => {
    if (category && category.type !== type && category.type !== 'both') {
      setCategory(null)
    }
  }, [type])

  /** 🔁 carregar edição */
  useEffect(() => {
    if (!initialData) return

    setDescription(initialData.description)
    setAmount(initialData.amount.toString())
    setType(initialData.type)
    setDate(initialData.date)

    setCategory(
      categories.find(c => c.id === initialData.category_id) ?? null
    )

    setAccount(
      accounts.find(a => a.id === initialData.account_id) ?? null
    )
  }, [initialData])

  const reset = () => {
    setDescription('')
    setAmount('')
    setType('expense')
    setCategory(null)
    setAccount(null)
    setDate(new Date().toISOString().split('T')[0])
    setIsInstallment(false)
    setIsRecurring(false)
  }

  return (
    <TransactionFormContext.Provider
      value={{
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
      }}
    >
      {children}
    </TransactionFormContext.Provider>
  )
}
