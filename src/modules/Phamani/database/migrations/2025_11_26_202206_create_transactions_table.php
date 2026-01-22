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
        Schema::create("{$this->schema}.transactions", function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('user_id');
            $table->uuid('account_id');
            $table->uuid('category_id');

            $table->string('name');
            $table->text('description')->nullable();

            $table->enum('type', ['income', 'expense']);
            $table->decimal('amount', 12, 2);

            $table->date('date');

            // $table->boolean('is_recurring')->default(false);
            $table->uuid('recurring_id')->nullable();

            // $table->boolean('is_installment')->default(false);
            $table->uuid('installment_id')->nullable();

            $table->timestamps();

            // 🔗 Foreign keys
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('account_id')->references('id')->on("{$this->schema}.accounts")->cascadeOnDelete();
            $table->foreign('category_id')->references('id')->on("{$this->schema}.categories")->restrictOnDelete();

            $table->foreign('recurring_id')->references('id')->on("{$this->schema}.recurring_transactions")->nullOnDelete();
            $table->foreign('installment_id')->references('id')->on("{$this->schema}.installments")->nullOnDelete();

            // ⚡ Índices para relatórios
            $table->index(['user_id', 'date']);
            $table->index(['type']);
            $table->index(['category_id']);
            $table->index(['account_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.transactions");
    }
};
