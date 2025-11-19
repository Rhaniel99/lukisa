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
        Schema::create("{$this->schema}.memories", function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');

            $table->foreignUuid('place_id')
                  ->constrained("{$this->schema}.places")
                  ->onDelete('cascade');

            $table->string('title');
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.memories");
    }
};