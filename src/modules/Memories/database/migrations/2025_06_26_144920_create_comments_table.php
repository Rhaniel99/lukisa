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
        Schema::create("{$this->schema}.comments", function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            $table->foreignId('memory_id')
                  ->constrained("{$this->schema}.memories")
                  ->onDelete('cascade');

            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.comments");
    }
};

