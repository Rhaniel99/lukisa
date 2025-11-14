<?php

use Illuminate\Database\Schema\Blueprint;
use Modules\Core\Database\Migrations\ModuleMigration;

return new class extends ModuleMigration
{
    public function up(): void
    {
        $this->createTable('chat_messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('role');
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        $this->dropTable('chat_messages');
    }
};
