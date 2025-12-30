import { X, Wallet, CreditCard, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface CreateAccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (account: { name: string; type: string }) => void;
}

export function CreateAccountDrawer({
  isOpen,
  onClose,
  onCreate,
}: CreateAccountDrawerProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'cash' | 'checking' | 'credit'>('checking');

  const handleCreate = () => {
    onCreate({ name, type });
    setName('');
    setType('checking');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-[#F5EFE6] border-l-2 border-[#E8DCC4] p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#3D2817]">Nova Conta</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-[#6B4E3D]" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Nome */}
            <div>
              <label className="text-sm text-[#6B4E3D]">Nome da conta</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Nubank"
                className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-[#E8DCC4]"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="text-sm text-[#6B4E3D] mb-2 block">Tipo</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setType('cash')}
                  className={`p-3 rounded-xl border ${type === 'cash'
                      ? 'bg-[#E8DCC4]'
                      : 'bg-white'
                    }`}
                >
                  <Banknote className="mx-auto" />
                  <p className="text-xs mt-1">Dinheiro</p>
                </button>

                <button
                  onClick={() => setType('checking')}
                  className={`p-3 rounded-xl border ${type === 'checking'
                      ? 'bg-[#E8DCC4]'
                      : 'bg-white'
                    }`}
                >
                  <Wallet className="mx-auto" />
                  <p className="text-xs mt-1">Conta</p>
                </button>

                <button
                  onClick={() => setType('credit')}
                  className={`p-3 rounded-xl border ${type === 'credit'
                      ? 'bg-[#E8DCC4]'
                      : 'bg-white'
                    }`}
                >
                  <CreditCard className="mx-auto" />
                  <p className="text-xs mt-1">Crédito</p>
                </button>
              </div>
            </div>

            <button
              disabled={!name}
              onClick={handleCreate}
              className="w-full mt-6 py-4 bg-[#3D2817] text-[#F5EFE6] rounded-xl disabled:opacity-50"
            >
              Criar e usar conta
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
