import { useState } from 'react';
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Layers,
    Plus,
    Bell,
    Search,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';

import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { CashFlowChart, CategoryPieChart } from './ui/Chart';

import { FallbackImage } from '@/Components/ui/FallbackImage';
import Transactions from './Transactions';
import { NewTransactionModal } from './components/modal/NewTransactionModal';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/Types/models';
import { Account, Category } from '@/Types/Phamani';

interface KPIProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: React.ElementType;
    variant?: 'default' | 'primary' | 'success' | 'danger';
}

interface Props extends PageProps {
    categories: Category[]
    accounts: Account[]
}

function KPICard({ title, value, trend, trendUp, icon: Icon, variant = 'default' }: KPIProps) {
    return (
        <Card
            className={`relative overflow-hidden p-6 ${variant === 'primary'
                ? 'bg-[#E8DCC4] border-[#3D2817] border-2'
                : 'bg-[#FBF7F1]'
                }`}
            variant="interactive"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl flex items-center justify-center ${variant === 'primary'
                    ? 'bg-[#3D2817] text-[#F5EFE6]'
                    : 'bg-[#E8DCC4] text-[#6B4F3A]'
                    }`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${trendUp ? 'bg-[#E3F9E5] text-[#1F5428]' : 'bg-[#FCE7E7] text-[#D4183D]'
                        }`}>
                        {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium mb-1 text-[#8B7355]">
                    {title}
                </p>
                <h3 className="text-3xl font-bold text-[#3D2817]">
                    {value}
                </h3>
            </div>
        </Card>
    );
}

export default function Index({ categories, accounts }: Props) {
    const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
    const [view, setView] = useState<'dashboard' | 'transactions'>('dashboard');

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
                <header className="flex items-center justify-between mb-10 px-0">
                    <div className="flex items-center gap-4">
                        <button
                            // onClick={onBack}
                            className="p-2 -ml-2 rounded-xl border-2 border-transparent hover:border-[#E8DCC4] text-[#6B4F3A] hover:bg-[#E8DCC4] transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="w-12 h-12 bg-[#6B4F3A] rounded-2xl flex items-center justify-center shadow-lg text-[#F5EFE6]">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#3D2817]">Phamani</h1>
                            <p className="text-[#8B7355] text-sm">Gestão Financeira Pessoal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#E8DCC4] focus-within:border-[#6B4F3A] transition-colors">
                            <Search className="w-4 h-4 text-[#8B7355]" />
                            <input
                                type="text"
                                placeholder="Buscar transações..."
                                className="bg-transparent border-none focus:outline-none text-sm placeholder:text-[#D4C5A9] w-64 text-[#3D2817]"
                            />
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-white border border-[#E8DCC4] rounded-xl text-[#6B4F3A] hover:bg-[#FBF7F1] transition-colors relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4183D] rounded-full border border-white"></span>
                        </motion.button>
                        <div className="w-12 h-12 rounded-full border-2 border-[#E8DCC4] overflow-hidden">
                            <FallbackImage
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=60"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: KPIs & Charts (9/12) */}
                    <div className="lg:col-span-9 space-y-8">

                        {/* KPIs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            <KPICard
                                title="Saldo Total"
                                value="R$ 12.450,00"
                                icon={Wallet}
                                variant="primary"
                            />
                            <KPICard
                                title="Receitas"
                                value="R$ 8.200,00"
                                trend="+12%"
                                trendUp={true}
                                icon={TrendingUp}
                            />
                            <KPICard
                                title="Despesas"
                                value="R$ 3.150,00"
                                trend="-5%"
                                trendUp={true}
                                icon={TrendingDown}
                            />
                            <KPICard
                                title="Parcelamentos"
                                value="R$ 1.200,00"
                                icon={Layers}
                            />
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Main Line Chart (2/3) */}
                            <Card className="md:col-span-2 flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="font-bold text-[#3D2817]">Fluxo de Caixa</h3>
                                        <p className="text-[#8B7355] text-sm">Entradas vs Saídas este ano</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="cursor-pointer hover:bg-[#E8DCC4]">Mensal</Badge>
                                        <Badge variant="default" className="cursor-pointer">Anual</Badge>
                                    </div>
                                </div>

                                {/* Line Chart */}
                                <div className="h-72 -ml-4 w-full">
                                    <CashFlowChart data={lineData} />
                                </div>
                            </Card>

                            {/* Pie Chart (1/3) */}
                            <Card className="flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-[#3D2817]">Categorias</h3>
                                    <button className="text-[#8B7355] hover:text-[#3D2817]">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Pie Chart */}
                                <div className="h-72 w-full">
                                    <CategoryPieChart data={pieData} />
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column: Sidebar / Quick Actions (3/12) */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Quick Add Button - Prominent */}
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full py-8 text-lg shadow-xl flex flex-col gap-2 items-center justify-center rounded-2xl"
                            onClick={() => setIsNewTransactionOpen(true)}
                        >
                            <Plus className="w-8 h-8" />
                            Nova Transação
                        </Button>

                        {/* Recent Transactions List */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-[#3D2817]">Recentes</h3>
                                <button
                                    onClick={() => setView('transactions')}
                                    className="text-sm text-[#6B4F3A] hover:underline"
                                >
                                    Ver tudo
                                </button>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { id: 1, title: 'Supermercado', val: -450.00, date: 'Hoje', icon: '🛒' },
                                    { id: 2, title: 'Freelance UI', val: 2500.00, date: 'Ontem', icon: '💻' },
                                    { id: 3, title: 'Uber', val: -24.90, date: 'Ontem', icon: '🚗' },
                                    { id: 4, title: 'Spotify', val: -21.90, date: '12 Nov', icon: '🎵' },
                                ].map((t) => (
                                    <Card
                                        key={t.id}
                                        className="p-4 flex items-center justify-between hover:bg-[#E8DCC4]/30 transition-colors !shadow-sm !border-0"
                                        variant="interactive"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm">
                                                {t.icon}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#3D2817] text-sm">{t.title}</p>
                                                <p className="text-xs text-[#8B7355]">{t.date}</p>
                                            </div>
                                        </div>
                                        <span className={`font-bold text-sm ${t.val > 0 ? 'text-[#4A7A5E]' : 'text-[#3D2817]'}`}>
                                            {t.val > 0 ? '+' : ''} R$ {Math.abs(t.val).toFixed(2)}
                                        </span>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Credit Card Preview */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative h-48 w-full rounded-3xl bg-gradient-to-br from-[#3D2817] to-[#6B4F3A] p-6 text-[#F5EFE6] shadow-2xl overflow-hidden cursor-pointer"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                            <div className="flex justify-between items-start mb-8">
                                <span className="text-lg font-bold tracking-wider">Nubank</span>
                                <Wallet className="w-6 h-6 opacity-80" />
                            </div>
                            <div className="space-y-1 mb-6">
                                <p className="text-xs opacity-70 uppercase tracking-widest">Fatura Atual</p>
                                <h3 className="text-2xl font-bold">R$ 1.250,00</h3>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm opacity-80">**** 4242</p>
                                <p className="text-xs opacity-60">Vence 10/12</p>
                            </div>
                        </motion.div>

                    </div>
                </main>

                <NewTransactionModal
                    isOpen={isNewTransactionOpen}
                    onClose={() => setIsNewTransactionOpen(false)}
                    onSave={(t) => console.log(t)}
                    categories={categories}   // 👈 passa aqui
                    accounts={accounts}
                />
            </div>
        </>

    );
}
