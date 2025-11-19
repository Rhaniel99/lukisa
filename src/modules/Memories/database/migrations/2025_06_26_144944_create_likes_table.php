<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private string $schema;

    public function __construct()
    {
        // Pega o nome do schema do arquivo de config do módulo
        $this->schema = config('memories.database.schema');
    }

    public function up(): void
    {
        Schema::create("{$this->schema}.likes", function (Blueprint $table) {
            // A tabela 'users' geralmente fica no schema public/padrão
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');

            // Chave estrangeira para a tabela 'memories'
            $table->uuid('memory_id');
            $table->foreign('memory_id')
                  ->references('id')
                  ->on("{$this->schema}.memories")
                  ->onDelete('cascade');

            $table->timestamp('created_at')->useCurrent();

            // Chave primária composta
            $table->primary(['user_id', 'memory_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("{$this->schema}.likes");
    }
};