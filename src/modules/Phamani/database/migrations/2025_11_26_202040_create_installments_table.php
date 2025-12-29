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
        Schema::create("{$this->schema}.installments", function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('user_id');
            $table->string('name');

            $table->decimal('total_amount', 12, 2);
            $table->decimal('installment_amount', 12, 2);
            $table->integer('installments');

            $table->date('start_date');
            $table->date('end_date');

            $table->enum('status', ['active', 'completed', 'cancelled'])->default('active');

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();

            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.installments");
    }
};
