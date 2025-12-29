<?php

namespace Modules\Phamani\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Phamani\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            ['name' => 'Alimentação', 'type' => 'expense'],
            ['name' => 'Transporte', 'type' => 'expense'],
            ['name' => 'Lazer', 'type' => 'expense'],
            ['name' => 'Saúde', 'type' => 'expense'],
            ['name' => 'Salário', 'type' => 'income'],
            ['name' => 'Freelance', 'type' => 'income'],
            ['name' => 'Outros', 'type' => 'both'],
        ];

        foreach ($defaults as $category) {
            Category::firstOrCreate(
                [
                    'name' => $category['name'],
                    'user_id' => null,
                ],
                [
                    'type' => $category['type'],
                    'is_default' => true,
                ]
            );
        }
    }
}
