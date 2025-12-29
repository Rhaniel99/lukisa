import { useState, useEffect } from 'react';
import { X, Calendar, CreditCard, Tag, Check, ArrowRight, Repeat, Layers, Wallet, Receipt } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction, TransactionType } from '@/Types/Phamani/Transaction';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id' | 'status'>) => void;
  initialData?: Transaction | null;
}

export function NewTransactionModal({ isOpen, onClose, onSave, initialData }: NewTransactionModalProps) {
  // Form State
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('Alimentação');
  const [account, setAccount] = useState('Nubank');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Advanced Toggles
  const [isInstallment, setIsInstallment] = useState(false);
  const [installmentsCount, setInstallmentsCount] = useState(2);
  
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('mensal');

  // Reset or Load Data
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setDescription(initialData.description);
        setAmount(initialData.amount.toString());
        setType(initialData.type);
        setCategory(initialData.category);
        setAccount(initialData.account);
        setDate(initialData.date);
        setIsInstallment(!!initialData.isInstallment);
        setInstallmentsCount(initialData.installments?.total || 2);
        setIsRecurring(!!initialData.isRecurring);
        setFrequency(initialData.frequency || 'mensal');
      } else {
        setDescription('');
        setAmount('');
        setType('expense');
        setCategory('Alimentação');
        setAccount('Nubank');
        setDate(new Date().toISOString().split('T')[0]);
        setIsInstallment(false);
        setInstallmentsCount(2);
        setIsRecurring(false);
        setFrequency('mensal');
      }
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    onSave({
      description,
      amount: Number(amount),
      type,
      category,
      account,
      date,
      isInstallment,
      installments: isInstallment ? { current: 1, total: installmentsCount } : undefined,
      isRecurring,
      frequency: isRecurring ? frequency : undefined,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#3D2817]/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#F5EFE6] rounded-[2rem] shadow-2xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col md:flex-row relative border-2 border-[#E8DCC4]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 text-[#6B4E3D] hover:text-[#3D2817] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* LEFT COLUMN: FORM */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-[#F5EFE6]">
              <h2 className="text-2xl font-bold text-[#3D2817] mb-8">
                {initialData ? 'Editar Transação' : 'Nova Transação'}
              </h2>

              <div className="space-y-6">
                
                {/* Type Toggle */}
                <div className="flex bg-[#E8DCC4] p-1 rounded-xl">
                  <button
                    onClick={() => setType('expense')}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                      type === 'expense' ? 'bg-[#FCE7E7] text-[#D4183D] shadow-sm' : 'text-[#6B4E3D] hover:bg-[#D4C5A9]/50'
                    }`}
                  >
                    Despesa
                  </button>
                  <button
                    onClick={() => setType('income')}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                      type === 'income' ? 'bg-[#E3F9E5] text-[#1F5428] shadow-sm' : 'text-[#6B4E3D] hover:bg-[#D4C5A9]/50'
                    }`}
                  >
                    Receita
                  </button>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">Valor</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355] font-bold">R$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0,00"
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] text-2xl font-bold text-[#3D2817] placeholder:text-[#D4C5A9]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">Descrição</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Compras do mês"
                    className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] text-[#3D2817]"
                  />
                </div>

                {/* Category & Account Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">Categoria</label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] text-[#3D2817] appearance-none"
                      >
                        <option>Alimentação</option>
                        <option>Transporte</option>
                        <option>Lazer</option>
                        <option>Saúde</option>
                        <option>Salário</option>
                        <option>Freelance</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8B7355]">
                         <Tag className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">Conta</label>
                    <div className="relative">
                      <select
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] text-[#3D2817] appearance-none"
                      >
                        <option>Nubank</option>
                        <option>Inter</option>
                        <option>Itaú</option>
                        <option>Dinheiro</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8B7355]">
                         <Wallet className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">Data</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] text-[#3D2817]"
                  />
                </div>

                {/* Advanced Options */}
                <div className="space-y-4 pt-4 border-t border-[#E8DCC4]">
                  
                  {/* Installment Toggle */}
                  <div className="flex items-center justify-between p-3 bg-[#FBF7F1] rounded-xl border border-[#E8DCC4]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#E8DCC4] rounded-lg text-[#6B4E3D]">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-[#3D2817] font-medium">Parcelado?</span>
                    </div>
                    <button 
                      onClick={() => { setIsInstallment(!isInstallment); setIsRecurring(false); }}
                      className={`w-12 h-7 rounded-full p-1 transition-colors ${isInstallment ? 'bg-[#6B4E3D]' : 'bg-[#D4C5A9]'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${isInstallment ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {isInstallment && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pl-4 border-l-2 border-[#6B4E3D]"
                    >
                      <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">Número de Parcelas</label>
                      <input
                        type="number"
                        min="2"
                        value={installmentsCount}
                        onChange={(e) => setInstallmentsCount(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-white border-2 border-[#E8DCC4] rounded-xl text-[#3D2817]"
                      />
                    </motion.div>
                  )}

                  {/* Recurring Toggle */}
                  <div className="flex items-center justify-between p-3 bg-[#FBF7F1] rounded-xl border border-[#E8DCC4]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#E8DCC4] rounded-lg text-[#6B4E3D]">
                        <Repeat className="w-5 h-5" />
                      </div>
                      <span className="text-[#3D2817] font-medium">Recorrente?</span>
                    </div>
                    <button 
                      onClick={() => { setIsRecurring(!isRecurring); setIsInstallment(false); }}
                      className={`w-12 h-7 rounded-full p-1 transition-colors ${isRecurring ? 'bg-[#6B4E3D]' : 'bg-[#D4C5A9]'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${isRecurring ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {isRecurring && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pl-4 border-l-2 border-[#6B4E3D]"
                    >
                      <label className="block text-sm font-serif text-[#6B4E3D] mb-2 ml-1">Frequência</label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full px-4 py-2 bg-white border-2 border-[#E8DCC4] rounded-xl text-[#3D2817]"
                      >
                        <option value="diario">Diário</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                        <option value="anual">Anual</option>
                      </select>
                    </motion.div>
                  )}

                </div>

                <button
                  onClick={handleSave}
                  disabled={!amount || !description}
                  className="w-full py-4 bg-[#3D2817] text-[#F5EFE6] rounded-xl hover:bg-[#543924] transition-colors font-medium text-lg shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {initialData ? 'Atualizar Transação' : 'Salvar Transação'}
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE PREVIEW */}
            <div className="hidden md:flex w-1/2 bg-[#E8DCC4]/50 border-l-2 border-[#D4C5A9] flex-col items-center justify-center p-12 relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4C5A9]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6B4E3D]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <p className="text-[#6B4E3D] font-bold tracking-widest uppercase mb-8 z-10 text-sm mt-12">Live Preview</p>

              {/* Card Preview */}
              <motion.div 
                key={type}
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-sm bg-[#F5EFE6] rounded-[2rem] shadow-2xl border border-[#fff]/50 p-8 relative z-10"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl ${type === 'income' ? 'bg-[#E3F9E5] text-[#1F5428]' : 'bg-[#FCE7E7] text-[#D4183D]'}`}>
                    {type === 'income' ? <Receipt className="w-8 h-8" /> : <Receipt className="w-8 h-8" />}
                  </div>
                  <div className="text-right">
                    <p className="text-[#8B7355] text-sm font-medium mb-1">{account}</p>
                    <p className="text-[#3D2817] font-bold text-xs uppercase tracking-wider opacity-60">Conta</p>
                  </div>
                </div>

                <div className="mb-8">
                   <p className="text-[#8B7355] text-sm mb-2 font-medium">Valor</p>
                   <h3 className={`text-4xl font-bold ${type === 'income' ? 'text-[#1F5428]' : 'text-[#D4183D]'}`}>
                     {type === 'expense' ? '-' : '+'} R$ {Number(amount).toFixed(2) || '0.00'}
                   </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-[#fff]/50 rounded-xl">
                    <div className="p-2 bg-[#E8DCC4] rounded-lg text-[#6B4E3D]">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[#3D2817] font-bold text-sm">{description || 'Sem descrição'}</p>
                      <p className="text-[#8B7355] text-xs">{category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-[#fff]/50 rounded-xl">
                    <div className="p-2 bg-[#E8DCC4] rounded-lg text-[#6B4E3D]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[#3D2817] font-bold text-sm">
                        {new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                      {isRecurring && <p className="text-[#8B7355] text-xs">Repete {frequency}</p>}
                      {isInstallment && <p className="text-[#8B7355] text-xs">Parcela 1 de {installmentsCount}</p>}
                    </div>
                  </div>
                </div>

              </motion.div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}