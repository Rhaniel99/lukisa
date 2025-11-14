<?php

use Illuminate\Database\Schema\Blueprint;
use Modules\Core\Database\Migrations\ModuleMigration;

return new class extends ModuleMigration
{
    public function up(): void
    {
        $this->createTable('likes', function (Blueprint $table) {
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->uuid('memory_id');
            $table->foreign('memory_id')->references('id')->on("{$this->schema}.memories")->onDelete('cascade');
            $table->timestamp('created_at')->useCurrent();
            $table->primary(['user_id', 'memory_id']);
        });
    }

    public function down(): void
    {
        $this->dropTable('likes');
    }
};
