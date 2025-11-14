<?php

use Illuminate\Database\Schema\Blueprint;
use Modules\Core\Database\Migrations\ModuleMigration;

return new class extends ModuleMigration
{
    protected function getModuleSchema(): string
    {
        return config('memories.database.schema');
    }

    public function up(): void
    {
        $this->createTable('places', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->nullable();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->timestamps();
            $table->unique(['latitude', 'longitude'], 'places_lat_lng_unique');
        });
    }

    public function down(): void
    {
        $this->dropTable('places');
    }
};
