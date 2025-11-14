<?php

use Illuminate\Database\Schema\Blueprint;
use Modules\Core\Database\Migrations\ModuleMigration;

return new class extends ModuleMigration
{
    public function up(): void
    {
        $this->createTable('memories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('place_id')->constrained("{$this->schema}.places")->onDelete('cascade');
            $table->string('title');
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        $this->dropTable('memories');
    }
};
