export interface KPITrend {
    value: number
    direction: 'up' | 'down'
}

export interface KPIValue {
    value: number
    trend: KPITrend | null
}

export interface Kpis {
    total_balance: number

    income: KPIValue
    expense: KPIValue
    installments: KPIValue

    // opcionais (mock por enquanto)
    bank_total?: number
    shared_total?: number
}

export interface CashFlowPoint {
    label: string
    income: number
    expense: number
}

export interface CategoryPiePoint {
    name: string
    value: number
    color: string
}