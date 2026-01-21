import { useState } from 'react';
import Transactions from './Transactions';
import { Head, router, usePage } from '@inertiajs/react';
import { Account, CashFlowPoint, Category, CategoryPiePoint, Kpis } from '@/Types/Phamani';
import { useTransactions } from './hooks/useTransactions';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { PageProps } from '@/Types/Inertia/PageProps';
import { DashboardMain } from './components/dashboard/DashboardMain';
import { DashboardContent } from './components/dashboard/DashboardContent';
import { DashboardSidebar } from './components/dashboard/DashboardSidebar';
import { NewTransactionModal } from './components/modal/transactions/NewTransactionModal';
import { useInertiaPreload } from '@/Hooks/useInertiaPreload';

interface Props extends PageProps {
    kpis: Kpis
    cashFlow: CashFlowPoint[]
    categoryPie: CategoryPiePoint[]
    categories: Category[]
    accounts: Account[]
}

export default function Index({ kpis, cashFlow, categoryPie, categories, accounts }: Props) {
    const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
    const [view, setView] = useState<'dashboard' | 'transactions'>('dashboard');

    const { create } = useTransactions();

    const preloadTransactionData = useInertiaPreload({
        only: ['categories', 'accounts'],
    })

    const pieData = [
        { name: 'Moradia', value: 400 },
        { name: 'Alimentação', value: 300 },
        { name: 'Lazer', value: 300 },
        { name: 'Outros', value: 200 },
    ];

    if (view === 'transactions') {
        return <Transactions onBack={() => setView('dashboard')} />;
    }

    return (
        <>
            <Head title="Phamani Dashboard" />

            <div className="min-h-screen bg-[#F5EFE6] text-[#3D2817] font-sans p-6 md:p-8">

                {/* Header */}
                <DashboardHeader
                    title="Phamani"
                    subtitle="Gestão Financeira Pessoal"
                    onBack={() => router.get('/lukisa')}
                />

                <DashboardMain
                    left={
                        <DashboardContent
                            kpis={kpis}
                            lineData={cashFlow}
                            pieData={categoryPie}
                        />
                    }
                    right={
                        <DashboardSidebar
                            onNewTransaction={() => setIsNewTransactionOpen(true)}
                            onViewAll={() => setView('transactions')}
                            onPreloadNewTransaction={preloadTransactionData}

                        />
                    }
                />

                <NewTransactionModal
                    isOpen={isNewTransactionOpen}
                    onClose={() => setIsNewTransactionOpen(false)}
                    onSave={create.submit}
                    categories={categories}
                    accounts={accounts}
                />
            </div>
        </>

    );
}
