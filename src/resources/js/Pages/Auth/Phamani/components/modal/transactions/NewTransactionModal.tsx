import { AnimatePresence } from 'motion/react'
import { TransactionModalLayout } from './TransactionModalLayout'
import { Transaction } from '@/Types/Phamani'

interface NewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  categories: any[]
  accounts: any[]
  initialData?: Transaction | null
}

export function NewTransactionModal({
  isOpen,
  onClose,
  categories,
  accounts,
  initialData,
}: NewTransactionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <TransactionModalLayout
          onClose={onClose}
          categories={categories}
          accounts={accounts}
          initialData={initialData}
        />
      )}
    </AnimatePresence>
  )
}
