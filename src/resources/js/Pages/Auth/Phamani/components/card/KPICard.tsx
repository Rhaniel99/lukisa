import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card } from '@/Pages/Auth/Phamani/ui/Card';


interface KPIProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: React.ElementType;
    variant?: 'default' | 'primary' | 'success' | 'danger';
}


export default function KPICard({ title, value, trend, trendUp, icon: Icon, variant = 'default' }: KPIProps) {
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
