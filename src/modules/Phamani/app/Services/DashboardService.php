<?php

namespace Modules\Phamani\Services;

use Modules\Phamani\Interfaces\Services\IDashboardService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Phamani\Models\Account;
use Modules\Phamani\Models\Installment;
use Modules\Phamani\Models\Transaction;

class DashboardService implements IDashboardService
{
    public function kpis(string $userId): array
    {
        $now = Carbon::now();
        $lastMonth = $now->copy()->subMonth();

        $currentIncome = $this->monthlyIncome($userId, $now);
        $previousIncome = $this->monthlyIncome($userId, $lastMonth);

        $currentExpense = $this->monthlyExpense($userId, $now);
        $previousExpense = $this->monthlyExpense($userId, $lastMonth);

        return [
            'total_balance' => $this->totalBalance($userId),

            'income' => [
                'value' => $currentIncome,
                'trend' => $this->trend($currentIncome, $previousIncome),
            ],

            'expense' => [
                'value' => $currentExpense,
                'trend' => $this->trend($currentExpense, $previousExpense),
            ],

            'installments' => [
                'value' => $this->activeInstallments($userId),
                'trend' => null,
            ],
        ];
    }

    public function cashFlow(
        string $userId,
        string $period = 'yearly'
    ): array {
        $now = Carbon::now();

        if ($period === 'monthly') {
            return $this->cashFlowByDay($userId, $now);
        }

        return $this->cashFlowByMonth($userId, $now->year);
    }

    public function categoryPie(
        string $userId,
        string $period = 'monthly'
    ): array {
        $query = Transaction::query()
            ->selectRaw('
    phamani.categories.name as name,
    phamani.categories.color as color,
    SUM(transactions.amount) as value
')
            ->join('phamani.categories', 'phamani.categories.id', '=', 'transactions.category_id')

            ->where('transactions.user_id', $userId)
            ->where('transactions.type', 'expense'); // 📌 normalmente o pie é de despesas

        if ($period === 'monthly') {
            $query
                ->whereMonth('transactions.date', now()->month)
                ->whereYear('transactions.date', now()->year);
        }

        if ($period === 'yearly') {
            $query->whereYear('transactions.date', now()->year);
        }

        return $query
            ->groupBy('phamani.categories.id', 'phamani.categories.name')

            ->orderByDesc('value')
            ->get()
            ->map(fn($row) => [
                'name' => $row->name,
                'value' => (float) $row->value,
                'color' => $row->color,
            ])
            ->values()
            ->toArray();
    }


    protected function cashFlowByDay(string $userId, Carbon $date): array
    {
        $rows = Transaction::query()
            ->selectRaw('
            EXTRACT(DAY FROM date) as day,
            SUM(CASE WHEN type = \'income\' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type = \'expense\' THEN amount ELSE 0 END) as expense
        ')
            ->where('user_id', $userId)
            ->whereMonth('date', $date->month)
            ->whereYear('date', $date->year)
            ->groupBy(DB::raw('EXTRACT(DAY FROM date)'))
            ->orderBy('day')
            ->get();

        return collect(range(1, $date->daysInMonth))->map(function ($day) use ($rows) {
            $row = $rows->firstWhere('day', $day);

            return [
                'label' => (string) $day,
                'income' => (float) ($row->income ?? 0),
                'expense' => (float) ($row->expense ?? 0),
            ];
        })->values()->toArray();
    }

    protected function cashFlowByMonth(string $userId, int $year): array
    {
        $rows = Transaction::query()->selectRaw(' EXTRACT(MONTH FROM date) as month, SUM(CASE WHEN type = \'income\' THEN amount ELSE 0 END) as income, SUM(CASE WHEN type = \'expense\' THEN amount ELSE 0 END) as expense ')->where('user_id', $userId)->whereYear('date', $year)->groupBy(DB::raw('EXTRACT(MONTH FROM date)'))->orderBy('month')->get();
        $months = collect(range(1, 12))->map(function ($month) use ($rows) {
            $row = $rows->firstWhere('month', $month);
            return ['label' => Carbon::create()->month($month)->translatedFormat('M'), 'income' => (float) ($row->income ?? 0), 'expense' => (float) ($row->expense ?? 0),];
        });
        return $months->values()->toArray();
    }

    protected function totalBalance(string $userId): float
    {
        return (float) Account::where('user_id', $userId)->sum('balance');
    }

    protected function monthlyIncome(string $userId, Carbon $now): float
    {
        return (float) Transaction::where('user_id', $userId)
            ->where('type', 'income')
            ->whereMonth('date', $now->month)
            ->whereYear('date', $now->year)
            ->sum('amount');
    }

    protected function monthlyExpense(string $userId, Carbon $now): float
    {
        return (float) Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->whereMonth('date', $now->month)
            ->whereYear('date', $now->year)
            ->sum('amount');
    }

    protected function activeInstallments(string $userId): float
    {
        return (float) Installment::where('user_id', $userId)
            ->where('status', 'active')
            ->sum('installment_amount');
    }

    protected function trend(float $current, float $previous): ?array
    {
        if ($previous <= 0) {
            return null; // evita divisão por zero
        }

        $diff = (($current - $previous) / $previous) * 100;

        return [
            'value' => round($diff, 1), // ex: 12.3
            'direction' => $diff >= 0 ? 'up' : 'down',
        ];
    }
}
