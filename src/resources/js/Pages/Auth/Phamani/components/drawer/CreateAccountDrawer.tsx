import { X, Wallet, CreditCard, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/Lib/Utils';
import { Label } from '@/Components/ui/label';
import { Form } from '@/Components/Shared/Form/Form';
import { useAccountsForm } from '../../hooks/useAccounts';

interface CreateAccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAccountDrawer({
  isOpen,
  onClose,
}: CreateAccountDrawerProps) {
  const { form, submit } = useAccountsForm(onClose)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay customizado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-[#3D2817]/40 backdrop-blur-[2px] cursor-default"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[90] h-full w-full max-w-[400px] bg-[#F5EFE6] border-l-2 border-[#E8DCC4] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8DCC4] p-6">
              <h2 className="text-xl font-bold text-[#3D2817]">Nova Conta</h2>
              <button
                onClick={onClose}
                className="text-[#6B4E3D] hover:text-[#3D2817] p-2 hover:bg-[#E8DCC4] rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <Form onSubmit={submit} className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Nome */}
              <div className="space-y-3">
                <Label className="text-[#6B4E3D] font-serif">Nome da conta</Label>
                <input
                  value={form.data.name}
                  onChange={(e) => form.setData('name', e.target.value)}
                  placeholder="Ex: Nubank"
                  className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl text-[#3D2817] placeholder:text-[#D4C5A9] focus:outline-none focus:border-[#6B4E3D]"
                />
              </div>

              {/* Tipo */}
              <div className="space-y-3">
                <Label className="text-[#6B4E3D] font-serif">Tipo</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => form.setData('type', 'cash')}

                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2",
                      form.data.type === 'cash'
                        ? "bg-white border-[#3D2817] text-[#3D2817]"
                        : "bg-white border-transparent text-[#D4C5A9] hover:border-[#E8DCC4]"
                    )}
                  >
                    <Banknote className="w-6 h-6" />
                    <span className="text-xs font-medium">Dinheiro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => form.setData('type', 'checking')}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2",
                      form.data.type === 'checking'
                        ? "bg-[#D4C5A9]/30 border-[#3D2817] text-[#3D2817]"
                        : "bg-white border-transparent text-[#D4C5A9] hover:border-[#E8DCC4]"
                    )}
                  >
                    <Wallet className="w-6 h-6" />
                    <span className="text-xs font-medium">Conta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => form.setData('type', 'credit')}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2",
                      form.data.type === 'credit'
                        ? "bg-white border-[#3D2817] text-[#3D2817]"
                        : "bg-white border-transparent text-[#D4C5A9] hover:border-[#E8DCC4]"
                    )}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span className="text-xs font-medium">Crédito</span>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#E8DCC4] bg-[#F5EFE6]">
                <button
                  type="submit"
                  disabled={form.processing || !form.data.name}
                  className="w-full py-4 bg-[#8B7355] text-[#F5EFE6] rounded-xl hover:bg-[#6B4E3D] text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                >
                  Criar e usar conta
                </button>
              </div>
            </Form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
