import { KPITrend } from "@/Types/Phamani"

export const formatCurrency = (v: number): string => 
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

 export const formatTrend = (trend: KPITrend | null) =>
        trend ? `${trend.value > 0 ? '+' : ''}${trend.value}%` : undefined