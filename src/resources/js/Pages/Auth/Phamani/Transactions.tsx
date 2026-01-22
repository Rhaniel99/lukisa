import { useState } from 'react';
import { ArrowLeft, Plus, Filter, ChevronDown, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { ShowTransactionDrawer } from './components/drawer/ShowTransactionDrawer';
import { Head, router } from '@inertiajs/react';
// import { Transaction } from './types';
// import { TransactionDrawer } from './TransactionDrawer';
// import { NewTransactionModal } from './NewTransactionModal';

interface TransactionsPageProps {
  onBack: () => void;
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

export default function Index({ onBack }: TransactionsPageProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  const mockTransactions: Transaction[] = [
    { id: '1', description: 'Supermercado', amount: 450.00, type: 'expense', category: 'Alimentação', account: 'Nubank', date: '2023-12-01', status: 'paid' },
    { id: '2', description: 'Freelance UI', amount: 2500.00, type: 'income', category: 'Trabalho', account: 'Inter', date: '2023-11-30', status: 'paid' },
    { id: '3', description: 'MacBook Pro', amount: 12999.00, type: 'expense', category: 'Eletrônicos', account: 'Nubank', date: '2023-11-28', isInstallment: true, installments: { current: 3, total: 12 }, status: 'pending' },
    { id: '4', description: 'Spotify', amount: 21.90, type: 'expense', category: 'Assinaturas', account: 'Nubank', date: '2023-11-28', isRecurring: true, frequency: 'mensal', status: 'paid' },
  ];

  return (
    <>
      <Head title="Phamani Transações" />

      <div className="min-h-screen bg-[#F5EFE6] text-[#3D2817] font-sans">

        {/* Header */}
        <header className="flex items-center justify-between p-6 md:p-8 border-b border-[#E8DCC4] bg-[#F5EFE6]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.visit(route('phamani.index'))}
              className="p-2 rounded-xl border-2 border-[#E8DCC4] text-[#6B4F3A] hover:bg-[#E8DCC4] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#3D2817]">Transações</h1>
              <p className="text-[#8B7355] text-sm">Histórico completo</p>
            </div>
          </div>

          <Button variant="primary" onClick={() => setIsNewTransactionOpen(true)} className="h-12">
            <Plus className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Nova Transação</span>
          </Button>
        </header>

        {/* Filters Bar - Floating */}
        <div className="sticky top-0 z-10 px-6 md:px-8 py-4 bg-[#F5EFE6]/95 backdrop-blur-sm transition-all">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide h-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DCC4] rounded-2xl shadow-md text-sm font-medium text-[#6B4F3A] hover:border-[#6B4F3A] cursor-pointer transition-all hover:-translate-y-0.5">
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
            </div>

            <div className="h-6 w-px bg-[#D4C5A9] mx-1"></div>

            {/* Filter Pills */}
            {['Todas as Contas', 'Todas as Categorias', 'Este Mês'].map((label, i) => (
              <button key={i} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DCC4] rounded-2xl text-sm font-medium text-[#3D2817] hover:bg-[#FBF7F1] hover:border-[#6B4F3A] transition-all shadow-sm hover:-translate-y-0.5 whitespace-nowrap">
                <span>{label}</span>
                <ChevronDown className="w-4 h-4 text-[#8B7355]" />
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="px-6 md:px-8 pb-12">
          <div className="bg-white rounded-3xl border border-[#E8DCC4] shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FBF7F1] border-b border-[#E8DCC4]">
                  <th className="text-left py-4 px-6 text-xs font-bold text-[#8B7355] uppercase tracking-wider w-16">Tipo</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-[#8B7355] uppercase tracking-wider">Descrição</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-[#8B7355] uppercase tracking-wider hidden md:table-cell">Categoria</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-[#8B7355] uppercase tracking-wider hidden sm:table-cell">Conta</th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-[#8B7355] uppercase tracking-wider">Valor</th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-[#8B7355] uppercase tracking-wider hidden sm:table-cell">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DCC4]">
                {mockTransactions.map((t, index) => (
                  <tr
                    key={t.id}
                    onClick={() => setSelectedTransaction(t)}
                    className={`group cursor-pointer transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#FBF7F1]'
                      } hover:bg-[#F5EFE6]`}
                  >
                    <td className="py-4 px-6">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'income' ? 'bg-[#E3F9E5] text-[#1F5428]' : 'bg-[#FCE7E7] text-[#D4183D]'
                        }`}>
                        {t.type === 'income' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#3D2817] group-hover:text-[#6B4F3A] transition-colors">{t.description}</p>
                      {t.isInstallment && (
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-[#E8DCC4] rounded-md text-[10px] font-bold text-[#6B4E3D] uppercase tracking-wide">
                          {t.installments?.current}/{t.installments?.total}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FBF7F1] border border-[#E8DCC4] text-[#6B4F3A]">
                        {t.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#3D2817] flex items-center justify-center text-[10px] text-[#F5EFE6]">
                          {t.account[0]}
                        </div>
                        <span className="text-sm text-[#3D2817]">{t.account}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`font-bold text-sm ${t.type === 'income' ? 'text-[#1F5428]' : 'text-[#3D2817]'
                        }`}>
                        {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right hidden sm:table-cell">
                      <span className="text-sm text-[#8B7355]">{t.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ShowTransactionDrawer
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
        />

        {/* <NewTransactionModal 
        isOpen={isNewTransactionOpen} 
        onClose={() => setIsNewTransactionOpen(false)}
        onSave={(t) => {
          console.log(t);
          setIsNewTransactionOpen(false);
        }} 
      /> */}
      </div>
    </>
  );
}
