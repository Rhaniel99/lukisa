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
        Schema::create("{$this->schema}.shared_transactions", function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('transaction_id');
            $table->uuid('user_id');

            // Valor total da parcela ou transação compartilhada
            $table->decimal('total_amount', 15, 2);

            // Observações opcionais (ex: "viagem com amigos")
            $table->string('notes')->nullable();

            $table->timestamps();

            $table->foreign('transaction_id')
                ->references('id')
                ->on("{$this->schema}.transactions")
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.shared_transactions");
    }
};
