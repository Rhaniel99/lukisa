<?php

namespace App\Observers;

use App\Models\User;
use Illuminate\Support\Str;
use Modules\Phamani\Models\Account;
use Modules\Phamani\Models\Category;

class UserObserver
{
    public function created(User $user): void
    {
        Account::create([
            'id'      => Str::uuid(),
            'user_id' => $user->id,
            'name'    => 'Carteira',
            'type'    => 'cash',
            'balance' => 0,
        ]);

        $defaults = [
            [
                'name'  => 'Alimentação',
                'type'  => 'expense',
                'icon'  => 'Utensils',
                'color' => '#D4183D',
            ],
            [
                'name'  => 'Transporte',
                'type'  => 'expense',
                'icon'  => 'Car',
                'color' => '#6B4E3D',
            ],
            [
                'name'  => 'Lazer',
                'type'  => 'expense',
                'icon'  => 'Gamepad2',
                'color' => '#8B7355',
            ],
            [
                'name'  => 'Saúde',
                'type'  => 'expense',
                'icon'  => 'HeartPulse',
                'color' => '#D4183D',
            ],
            [
                'name'  => 'Salário',
                'type'  => 'income',
                'icon'  => 'Wallet',
                'color' => '#1F5428',
            ],
            [
                'name'  => 'Freelance',
                'type'  => 'income',
                'icon'  => 'Briefcase',
                'color' => '#4A7A5E',
            ],
            [
                'name'  => 'Outros',
                'type'  => 'both',
                'icon'  => 'Tag',
                'color' => '#6B4E3D',
            ],
        ];

        foreach ($defaults as $category) {
            Category::create([
                'id'      => Str::uuid(),
                'user_id' => $user->id,
                'name'    => $category['name'],
                'type'    => $category['type'],
                'icon'    => $category['icon'],
                'color'   => $category['color'],
            ]);
        }
    }
}
