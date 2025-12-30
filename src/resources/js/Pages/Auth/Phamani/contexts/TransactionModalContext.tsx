import { createContext, useContext, useState } from 'react'

interface TransactionModalContextData {
  isOpen: boolean
  open(): void
  close(): void
}

const TransactionModalContext =
  createContext<TransactionModalContextData | null>(null)

export function TransactionModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TransactionModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </TransactionModalContext.Provider>
  )
}

export function useTransactionModal() {
  const ctx = useContext(TransactionModalContext)
  if (!ctx) throw new Error('useTransactionModal must be used inside provider')
  return ctx
}
