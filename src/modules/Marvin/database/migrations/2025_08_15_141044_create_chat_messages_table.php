<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private string $schema;

    public function __construct()
    {
        $this->schema = config('marvin.database.schema');
    }

    public function up(): void
    {
        DB::statement("CREATE SCHEMA IF NOT EXISTS {$this->schema}");

        Schema::create("{$this->schema}.chat_messages", function (Blueprint $table) {
            $table->uuid('id')->primary();
            // $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignUuid('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('role');
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.chat_messages");
    }
};
