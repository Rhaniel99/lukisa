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
        Schema::create("{$this->schema}.shared_transaction_participants", function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('shared_transaction_id');

            // Nome livre (ex: "Mac", "João", "Maria")
            $table->string('name');

            // Valor absoluto da parte
            $table->decimal('amount', 15, 2)->nullable();

            // Percentual da divisão
            $table->decimal('percentage', 5, 2)->nullable();

            $table->timestamps();

            $table->foreign('shared_transaction_id')
                ->references('id')
                ->on("{$this->schema}.shared_transactions")
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.shared_transaction_participants");
    }
};
