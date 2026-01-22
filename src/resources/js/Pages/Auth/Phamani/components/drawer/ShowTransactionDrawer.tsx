import { X, Edit2, Trash2, Calendar, CreditCard, Repeat, Tag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// import { Transaction } from './types';
import { useState } from 'react';
import { InstallmentModal } from '../modal/installment/InstallmentModal';
// import { InstallmentModal } from './InstallmentModal';
// import { NewTransactionModal } from './NewTransactionModal';

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

interface TransactionDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
}

export function ShowTransactionDrawer({ isOpen, onClose, transaction }: TransactionDrawerProps) {
    const [showInstallments, setShowInstallments] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    if (!transaction) return null;

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-[#3D2817]/20 backdrop-blur-[1px] z-50"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#F5EFE6] shadow-2xl z-[60] border-l-2 border-[#E8DCC4] flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-8 border-b border-[#D4C5A9] bg-[#F5EFE6]">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-2xl ${transaction.type === 'income' ? 'bg-[#E3F9E5] text-[#1F5428]' : 'bg-[#FCE7E7] text-[#D4183D]'}`}>
                                        {transaction.type === 'income' ? <ArrowRight className="w-6 h-6 -rotate-45" /> : <ArrowRight className="w-6 h-6 rotate-45" />}
                                    </div>
                                    <button onClick={onClose} className="p-2 hover:bg-[#E8DCC4] rounded-xl text-[#6B4E3D] transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <h2 className="text-3xl font-bold text-[#3D2817] mb-1">R$ {transaction.amount.toFixed(2)}</h2>
                                <p className="text-[#6B4E3D] text-lg">{transaction.description}</p>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-8 space-y-8 overflow-y-auto">

                                {/* Meta Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-2xl border border-[#E8DCC4] shadow-sm">
                                        <div className="flex items-center gap-2 text-[#8B7355] mb-2">
                                            <Tag className="w-4 h-4" />
                                            <span className="text-xs uppercase font-bold tracking-wider">Categoria</span>
                                        </div>
                                        <p className="text-[#3D2817] font-medium">{transaction.category}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-[#E8DCC4] shadow-sm">
                                        <div className="flex items-center gap-2 text-[#8B7355] mb-2">
                                            <CreditCard className="w-4 h-4" />
                                            <span className="text-xs uppercase font-bold tracking-wider">Conta</span>
                                        </div>
                                        <p className="text-[#3D2817] font-medium">{transaction.account}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-[#E8DCC4] shadow-sm">
                                        <div className="flex items-center gap-2 text-[#8B7355] mb-2">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-xs uppercase font-bold tracking-wider">Data</span>
                                        </div>
                                        <p className="text-[#3D2817] font-medium">{transaction.date}</p>
                                    </div>
                                    {transaction.isRecurring && (
                                        <div className="bg-[#6B4E3D] p-4 rounded-2xl border border-[#6B4E3D] shadow-sm">
                                            <div className="flex items-center gap-2 text-[#F5EFE6]/70 mb-2">
                                                <Repeat className="w-4 h-4" />
                                                <span className="text-xs uppercase font-bold tracking-wider">Recorrência</span>
                                            </div>
                                            <p className="text-[#F5EFE6] font-medium capitalize">{transaction.frequency}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Installment Action */}
                                {transaction.isInstallment && (
                                    <div className="bg-[#E8DCC4]/50 p-6 rounded-3xl border border-[#D4C5A9] flex items-center justify-between">
                                        <div>
                                            <h4 className="text-[#3D2817] font-bold mb-1">Parcelamento Ativo</h4>
                                            <p className="text-[#6B4E3D] text-sm">
                                                {transaction.installments?.current}/{transaction.installments?.total} parcelas
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setShowInstallments(true)}
                                            className="px-4 py-2 bg-[#6B4E3D] text-[#F5EFE6] rounded-xl text-sm font-medium hover:bg-[#3D2817] transition-colors shadow-md"
                                        >
                                            Ver Linha do Tempo
                                        </button>
                                    </div>
                                )}

                            </div>

                            {/* Footer Actions */}
                            <div className="p-8 border-t border-[#D4C5A9] bg-[#FAF7F1] flex gap-4">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#D4C5A9] text-[#6B4E3D] rounded-xl hover:bg-[#E8DCC4] transition-colors font-medium"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Editar
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#D4C5A9] text-[#3D2817] rounded-xl hover:bg-[#C9B59A] transition-colors font-medium">
                                    <Trash2 className="w-4 h-4" />
                                    Excluir
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Nested Modal */}
            <InstallmentModal
                isOpen={showInstallments}
                onClose={() => setShowInstallments(false)}
                transaction={transaction}
            />

            {/* Edit Modal */}
            {/* <NewTransactionModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={(updatedData) => {
          console.log('Updated:', updatedData);
          setIsEditing(false);
          // In a real app, you would update the transaction here
        }}
        initialData={transaction}
      /> */}
        </>
    );
}