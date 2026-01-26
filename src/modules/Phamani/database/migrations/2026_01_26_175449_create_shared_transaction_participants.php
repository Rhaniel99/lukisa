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

            $table->foreignUuid('shared_transaction_id')->constrained("{$this->schema}.shared_transactions")->onDelete('cascade');


            // Nome livre (ex: "Mac", "João", "Maria")
            $table->string('name');

            // Valor absoluto da parte
            $table->decimal('amount', 15, 2)->nullable();

            // Percentual da divisão
            $table->unsignedTinyInteger('percentage')->nullable();

            $table->timestamps();
                        $table->index(['shared_transaction_id']);

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
