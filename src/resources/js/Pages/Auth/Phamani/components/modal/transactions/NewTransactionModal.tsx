import { AnimatePresence } from 'motion/react'
import { TransactionFormProvider } from '@/Pages/Auth/Phamani/contexts/TransactionFormContext'
import { CreateTransaction, Transaction } from '@/Types/Phamani'
import { TransactionModalLayout } from './TransactionModalLayout'

interface NewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: CreateTransaction) => void
  categories: any[]
  accounts: any[]
  initialData?: Transaction | null
}

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
          <TransactionModalLayout {...props} />
        </TransactionFormProvider>
      )}
    </AnimatePresence>
  )
}
