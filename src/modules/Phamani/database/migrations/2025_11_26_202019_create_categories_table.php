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
        Schema::create("{$this->schema}.categories", function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('parent_id')->nullable();
            $table->string('name');
            $table->enum('type', ['income', 'expense', 'both'])->default('expense');
            $table->string('color', 20)->nullable(); 
            $table->string('icon', 30)->nullable();  
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->nullOnDelete();

            $table->unique(['user_id', 'name']);
        });

        // 🔑 FK SELF-REFERENTE EM SEGUNDA ETAPA
        Schema::table("{$this->schema}.categories", function (Blueprint $table) {
            $table->foreign('parent_id')
                ->references('id')
                ->on("{$this->schema}.categories")
                ->nullOnDelete();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
