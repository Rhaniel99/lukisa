<?php

namespace Modules\Phamani\Database\Seeders;

use Illuminate\Database\Seeder;

class PhamaniDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
        ]);
    }
}
