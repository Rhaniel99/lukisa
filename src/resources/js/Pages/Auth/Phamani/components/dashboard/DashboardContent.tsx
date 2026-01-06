import { Wallet, TrendingUp, TrendingDown, Layers, MoreHorizontal } from 'lucide-react'
import KPICard from '@/Pages/Auth/Phamani/components/card/KPICard';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { CashFlowChart, CategoryPieChart } from '../../ui/Chart';

interface DashboardContentProps {
    lineData: { name: string; value: number }[]
    pieData: { name: string; value: number }[]
}

export function DashboardContent({
    lineData,
    pieData,
}: DashboardContentProps) {
    return (
        <>
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <KPICard title="Saldo Total" value="R$ 12.450,00" icon={Wallet} variant="primary" />
                <KPICard title="Receitas" value="R$ 8.200,00" trend="+12%" trendUp icon={TrendingUp} />
                <KPICard title="Despesas" value="R$ 3.150,00" trend="-5%" trendUp icon={TrendingDown} />
                <KPICard title="Parcelamentos" value="R$ 1.200,00" icon={Layers} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-[#3D2817]">Fluxo de Caixa</h3>
                            <p className="text-[#8B7355] text-sm">Entradas vs Saídas este ano</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline">Mensal</Badge>
                            <Badge variant="default">Anual</Badge>
                        </div>
                    </div>

                    <div className="h-72 -ml-4 w-full">
                        <CashFlowChart data={lineData} />
                    </div>
                </Card>

                <Card>
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
