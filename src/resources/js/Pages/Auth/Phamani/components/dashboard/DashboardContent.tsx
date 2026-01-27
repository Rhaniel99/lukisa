import { Wallet, TrendingUp, TrendingDown, Layers, MoreHorizontal, Loader2 } from 'lucide-react'
import KPICard from '@/Pages/Auth/Phamani/components/card/KPICard';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { CashFlowChart, CategoryPieChart } from '../../ui/Chart';
import { CashFlowPoint, Kpis } from '@/Types/Phamani';
import { formatCurrency, formatTrend } from '@/Utils/format';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface DashboardContentProps {
    kpis: Kpis
    lineData: CashFlowPoint[]
    pieData: { name: string; value: number }[]
}

export function DashboardContent({
    kpis,
    lineData,
    pieData,
}: DashboardContentProps) {

    const { props } = usePage()
    const currentPeriod = props.period ?? 'yearly'

    const [loading, setLoading] = useState(false)

    function changePeriod(period: 'monthly' | 'yearly') {
        if (period === currentPeriod) return

        router.reload({
            data: { period },
            only: ['cashFlow', 'period'],
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        })
    }

    const mockBankInfo = {
        bank_total: 2000,
        shared_total: 1000,
    }


    return (
        <>
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
                <div className="md:col-span-2">
                    <KPICard
                        title="Saldo Atual"
                        value={formatCurrency(kpis.total_balance)}
                        icon={Wallet}
                        variant="primary"
                    />
                </div>
                <div className="md:col-span-2">
                    <KPICard
                        title="Receitas"
                        value={formatCurrency(kpis.income.value)}
                        trend={formatTrend(kpis.income.trend)}
                        trendUp={kpis.income.trend?.direction === 'up'}
                        icon={TrendingUp}
                    />
                </div>
                <div className="md:col-span-2">
                    <KPICard
                        title="Despesas"
                        value={formatCurrency(kpis.expense.value)}
                        trend={formatTrend(kpis.expense.trend)}
                        trendUp={kpis.expense.trend?.direction === 'down'}
                        icon={TrendingDown}
                    />
                </div>
                <div className="md:col-span-2">
                    <KPICard
                        title="Parcelamentos"
                        value={formatCurrency(kpis.installments.value)}
                        icon={Layers}
                    />
                </div>

                {/* Contexto financeiro  */}
                <div className="md:col-span-6">
                    {/* total bancário grande */}
                    <KPICard
                        title="Total Bancário"
                        value={formatCurrency(mockBankInfo.bank_total)}
                        icon={Wallet}
                        variant="default"
                    />
                </div>
                <div className="md:col-span-2">
                    <KPICard
                        title="Valor Compartilhado"
                        value={formatCurrency(mockBankInfo.shared_total)}
                        icon={Layers}
                        variant="default"
                    />
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <Card className="lg:col-span-2 min-w-0">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-[#3D2817]">Fluxo de Caixa</h3>
                            <p className="text-[#8B7355] text-sm">
                                {currentPeriod === 'monthly'
                                    ? 'Entradas vs Saídas este mês'
                                    : 'Entradas vs Saídas este ano'}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Badge
                                variant={currentPeriod === 'monthly' ? 'default' : 'outline'}
                                onClick={() => changePeriod('monthly')}
                                className="cursor-pointer"
                            >
                                Mensal
                            </Badge>

                            <Badge
                                variant={currentPeriod === 'yearly' ? 'default' : 'outline'}
                                onClick={() => changePeriod('yearly')}
                                className="cursor-pointer"
                            >
                                Anual
                            </Badge>
                        </div>
                    </div>

                    <div className="h-72 relative w-full overflow-hidden">
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#F5EFE6]/60 z-10">
                                <Loader2 className="w-6 h-6 animate-spin text-[#6B4F3A]" />
                            </div>
                        )}

                        {lineData && lineData.length > 0 && (
                            <CashFlowChart data={lineData} />
                        )}
                    </div>
                </Card>

                <Card className="min-w-0"> {/* 🔑 min-w-0 aqui também */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-[#3D2817]">Categorias</h3>
                        <MoreHorizontal className="w-5 h-5 text-[#8B7355]" />
                    </div>

                    <div className="h-72 w-full">
                        <CategoryPieChart data={pieData} />
                    </div>
                </Card>
            </div>
        </>
    )
}
