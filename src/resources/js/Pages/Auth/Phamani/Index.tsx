import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Account, CashFlowPoint, Category, CategoryPiePoint, Kpis, Transaction } from '@/Types/Phamani';
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
    recentTransactions: Transaction[]
}

export default function Index({ kpis, cashFlow, categoryPie, categories, accounts, recentTransactions }: Props) {
    const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

    const preloadTransactionData = useInertiaPreload({
        only: ['categories'],
    })

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
                            recentTransactions={recentTransactions}
                            accounts={accounts}
                            onNewTransaction={() => setIsNewTransactionOpen(true)}
                            onPreloadNewTransaction={preloadTransactionData}
                        />
                    }
                />

                <NewTransactionModal
                    isOpen={isNewTransactionOpen}
                    onClose={() => setIsNewTransactionOpen(false)}
                    // onSave={create.submit}
                    categories={categories}
                    accounts={accounts}
                />
            </div>
        </>

    );
}
