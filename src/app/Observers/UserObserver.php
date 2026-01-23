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
                'icon'  => 'utensils',
                'color' => 'orange',
            ],
            [
                'name'  => 'Transporte',
                'type'  => 'expense',
                'icon'  => 'car',
                'color' => 'blue',
            ],
            [
                'name'  => 'Lazer',
                'type'  => 'expense',
                'icon'  => 'gamepad',
                'color' => 'purple',
            ],
            [
                'name'  => 'Saúde',
                'type'  => 'expense',
                'icon'  => 'heart',
                'color' => 'red',
            ],
            [
                'name'  => 'Salário',
                'type'  => 'income',
                'icon'  => 'wallet',
                'color' => 'green',
            ],
            [
                'name'  => 'Freelance',
                'type'  => 'income',
                'icon'  => 'briefcase',
                'color' => 'teal',
            ],
            [
                'name'  => 'Outros',
                'type'  => 'both',
                'icon'  => 'tag',
                'color' => 'gray',
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
