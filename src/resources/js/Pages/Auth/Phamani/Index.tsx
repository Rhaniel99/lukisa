import { useState } from 'react';
import Transactions from './Transactions';
import { NewTransactionModal } from './components/modal/NewTransactionModal';
import { Head, router } from '@inertiajs/react';
import { Account, Category } from '@/Types/Phamani';
import { useTransactions } from './hooks/useTransactions';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { PageProps } from '@/Types/Inertia/PageProps';
import { DashboardMain } from './components/dashboard/DashboardMain';
import { DashboardContent } from './components/dashboard/DashboardContent';
import { DashboardSidebar } from './components/dashboard/DashboardSidebar';

interface Props extends PageProps {
    categories: Category[]
    accounts: Account[]
}

export default function Index({ categories, accounts }: Props) {
    const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
    const [view, setView] = useState<'dashboard' | 'transactions'>('dashboard');

    const { create } = useTransactions();

    // Mock Data for Charts
    const lineData = [
        { name: 'Jan', value: 2400 },
        { name: 'Fev', value: 1398 },
        { name: 'Mar', value: 9800 },
        { name: 'Abr', value: 3908 },
        { name: 'Mai', value: 4800 },
        { name: 'Jun', value: 3800 },
        { name: 'Jul', value: 4300 },
    ];

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
                            lineData={lineData}
                            pieData={pieData}
                        />
                    }
                    right={
                        <DashboardSidebar
                            onNewTransaction={() => setIsNewTransactionOpen(true)}
                            onViewAll={() => setView('transactions')}
                        />
                    }
                />

                <NewTransactionModal
                    isOpen={isNewTransactionOpen}
                    onClose={() => setIsNewTransactionOpen(false)}
                    onSave={create.submit}

                    processing={create.processing}
                    errors={create.errors}

                    categories={categories}
                    accounts={accounts}
                />
            </div>
        </>

    );
}
