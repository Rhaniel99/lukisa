<?php

use Illuminate\Database\Schema\Blueprint;
use Modules\Core\Database\Migrations\ModuleMigration;

return new class extends ModuleMigration
{
    public function up(): void
    {
        $this->createTable('comments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('memory_id')->constrained("{$this->schema}.memories")->onDelete('cascade');
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        $this->dropTable('comments');
    }
};
