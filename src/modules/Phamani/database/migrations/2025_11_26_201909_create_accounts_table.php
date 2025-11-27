<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private string $schema;

    public function __construct()
    {
        $this->schema = config('phamani.database.schema');
    }

    public function up(): void
    {
        DB::statement("DROP SCHEMA IF EXISTS {$this->schema} CASCADE");
        DB::statement("CREATE SCHEMA IF NOT EXISTS {$this->schema}");

        Schema::create("{$this->schema}.accounts", function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('name');
            $table->enum('type', ['checking', 'savings', 'credit', 'debt', 'cash', 'other'])->default('checking');
            $table->decimal('balance', 12, 2)->default(0);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.accounts");
    }
};
