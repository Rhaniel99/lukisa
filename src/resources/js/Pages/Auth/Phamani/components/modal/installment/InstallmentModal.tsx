import { X, Check, CreditCard, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Installment {
  number: number;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'future';
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  account: string;
  date: string;
  isInstallment?: boolean;
  installments?: {
    current: number;
    total: number;
  };
  isRecurring?: boolean;
  frequency?: string;
  tags?: string[];
  status: 'paid' | 'pending';
}

interface InstallmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export function InstallmentModal({ isOpen, onClose, transaction }: InstallmentModalProps) {
  // Mock installments based on transaction
  const total = transaction.installments?.total || 10;
  const current = transaction.installments?.current || 3;
  
  const installments: Installment[] = Array.from({ length: total }, (_, i) => {
    const num = i + 1;
    let status: Installment['status'] = 'future';
    if (num < current) status = 'paid';
    if (num === current) status = 'pending';
    
    return {
      number: num,
      date: `2025-${(i % 12) + 1}-24`, // Mock date
      amount: transaction.amount,
      status
    };
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#3D2817]/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#F5EFE6] rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E8DCC4] flex justify-between items-center bg-[#F5EFE6]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E8DCC4] rounded-2xl flex items-center justify-center text-[#6B4E3D]">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3D2817]">Parcelamento</h3>
                  <p className="text-[#6B4E3D] text-sm">{transaction.description}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[#E8DCC4] rounded-xl text-[#6B4E3D] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content - Timeline */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#FAF7F1]">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-[#E8DCC4]"></div>

                <div className="space-y-6">
                  {installments.map((inst) => (
                    <motion.div 
                      key={inst.number}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: inst.number * 0.05 }}
                      className="relative flex items-center gap-6"
                    >
                      {/* Dot */}
                      <div className={`relative z-10 w-16 h-8 flex items-center justify-center rounded-full text-xs font-bold border-2 ${
                        inst.status === 'paid' 
                          ? 'bg-[#6B4E3D] border-[#6B4E3D] text-[#F5EFE6]' 
                          : inst.status === 'pending'
                          ? 'bg-[#F5EFE6] border-[#6B4E3D] text-[#6B4E3D]'
                          : 'bg-[#E8DCC4] border-[#E8DCC4] text-[#8B7355]'
                      }`}>
                        {inst.number}x
                      </div>

                      {/* Card */}
                      <div className={`flex-1 p-4 rounded-2xl border flex items-center justify-between shadow-sm ${
                         inst.status === 'pending' 
                         ? 'bg-white border-[#6B4E3D]/30 shadow-md' 
                         : 'bg-white border-[#E8DCC4]'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#F5EFE6] rounded-xl text-[#6B4E3D]">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[#3D2817] font-bold text-sm">R$ {inst.amount.toFixed(2)}</p>
                            <p className="text-[#8B7355] text-xs">{inst.date}</p>
                          </div>
                        </div>
                        
                        {inst.status === 'paid' && (
                          <div className="flex items-center gap-1 text-[#6B4E3D] text-xs font-bold bg-[#E8DCC4]/50 px-3 py-1 rounded-lg">
                            <Check className="w-3 h-3" /> Pago
                          </div>
                        )}
                        {inst.status === 'pending' && (
                          <div className="flex items-center gap-1 text-[#D4183D] text-xs font-bold bg-[#FCE7E7] px-3 py-1 rounded-lg">
                            <Clock className="w-3 h-3" /> Pendente
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
