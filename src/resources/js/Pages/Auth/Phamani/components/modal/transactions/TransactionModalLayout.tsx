import { useTransactionForm } from "@/Pages/Auth/Phamani/contexts/TransactionFormContext"
import { motion } from 'motion/react'
import { Account, Category, CreateTransaction, Transaction } from "@/Types/Phamani"
import { useState } from "react"
import { TransactionForm } from "./TransactionForm"
import { TransactionPreview } from "./TransactionPreview"
import { CreateAccountDrawer } from "../../drawer/CreateAccountDrawer"
import { CreateCategoryDrawer } from "../../drawer/CreateCategoryDrawer"
import { X } from "lucide-react"
import { useTransactionsForm } from "../../../hooks/useTransactions"

interface TransactionModalLayoutProps {
  onClose: () => void
  categories: any[]
  accounts: any[]
  initialData?: Transaction | null
}

export function TransactionModalLayout({
  onClose,
  categories,
  accounts,
  initialData,
}: TransactionModalLayoutProps) {

  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false)
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false)

  const { form, submit } = useTransactionsForm(onClose)


  return (
    <>
      {/* ⛔ NÃO MEXER NESTE BLOCO */}
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

          {/* FORM */}
          <TransactionForm
            form={form}
            categories={categories}
            accounts={accounts}
            initialData={initialData}
            onSubmit={submit}
            onCreateCategory={() => setCategoryDrawerOpen(true)}
            onCreateAccount={() => setAccountDrawerOpen(true)}
          />

          {/* PREVIEW */}
          <TransactionPreview
            form={form}
            categories={categories}
            accounts={accounts}
          />
        </motion.div>
      </div>

      <CreateAccountDrawer
        isOpen={accountDrawerOpen}
        onClose={() => setAccountDrawerOpen(false)}
      />

      <CreateCategoryDrawer
        isOpen={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
      />
    </>
  )
}
