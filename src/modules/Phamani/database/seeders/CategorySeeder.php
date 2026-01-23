<?php

namespace Modules\Phamani\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;
use Modules\Phamani\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
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

        $users = User::all();

        foreach ($users as $user) {
            foreach ($defaults as $category) {
                Category::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'name'    => $category['name'],
                    ],
                    [
                        'id'    => Str::uuid(),
                        'type'  => $category['type'],
                        'icon'  => $category['icon'],
                        'color' => $category['color'],
                    ]
                );
            }
        }
    }
}
