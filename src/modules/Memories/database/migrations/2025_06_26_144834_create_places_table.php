<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private string $schema;

    public function __construct()
    {
        $this->schema = config('memories.database.schema');
    }

    public function up(): void
    {
        DB::statement("CREATE SCHEMA IF NOT EXISTS {$this->schema}");

        Schema::create("{$this->schema}.places", function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->nullable(); // Um nome opcional para o local, ex: "Torre Eiffel"
            $table->text('address')->nullable(); // Endereço textual, pode ser obtido via reverse geocoding
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->timestamps();
            $table->unique(['latitude', 'longitude'], 'places_lat_lng_unique'); // Garante que cada ponto geográfico seja único
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.places");
    }
};

