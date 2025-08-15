<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('marvin_chat_messages', function (Blueprint $table) {
            $table->id();
            // Identificador único para cada sessão de conversa (pode ser o ID da sessão do Laravel)
            $table->string('session_id')->index();
            // Quem disse a mensagem: 'user' ou 'assistant' (Marvin)
            $table->string('role');
            // O conteúdo da mensagem
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marvin_chat_messages');
    }
};
