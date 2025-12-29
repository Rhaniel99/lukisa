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
        Schema::create("{$this->schema}.recurring_transactions", function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('user_id');
            $table->uuid('account_id');
            $table->uuid('category_id');

            $table->string('name');
            $table->decimal('amount', 12, 2);

            $table->enum('type', ['income', 'expense']);
            $table->enum('frequency', ['daily', 'weekly', 'monthly', 'yearly']);

            $table->date('next_run');
            $table->date('end_date')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('account_id')->references('id')->on("{$this->schema}.accounts")->cascadeOnDelete();
            $table->foreign('category_id')->references('id')->on("{$this->schema}.categories")->restrictOnDelete();

            $table->index(['next_run']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.recurring_transactions");
    }
};
