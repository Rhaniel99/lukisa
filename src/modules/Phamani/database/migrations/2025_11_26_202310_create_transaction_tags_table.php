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
        Schema::create("{$this->schema}.transaction_tags", function (Blueprint $table) {
            $table->uuid('transaction_id');
            $table->uuid('tag_id');

            $table->primary(['transaction_id', 'tag_id']);

            $table->foreign('transaction_id')->references('id')->on("{$this->schema}.transactions")->cascadeOnDelete();
            $table->foreign('tag_id')->references('id')->on("{$this->schema}.tags")->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.transaction_tags");
    }
};
