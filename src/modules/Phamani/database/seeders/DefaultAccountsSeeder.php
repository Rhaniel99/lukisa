<?php

namespace Modules\Phamani\Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;
use Modules\Phamani\Models\Account;

class DefaultAccountsSeeder extends Seeder
{
    public function run(): void
    {
        User::each(function (User $user) {
            $exists = Account::where('user_id', $user->id)
                ->where('name', 'Carteira')
                ->exists();

            if (! $exists) {
                Account::create([
                    'id'      => Str::uuid(),
                    'user_id' => $user->id,
                    'name'    => 'Carteira',
                    'type'    => 'cash',
                    'balance' => 0,
                ]);
            }
        });
    }
}
