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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            $table->unsignedBigInteger('memory_id');
            $table->timestamp('created_at')->useCurrent(); // useCurrent() é uma boa prática aqui

            $table->primary(['user_id', 'memory_id']);

            // AQUI a mudança principal: referencie a tabela 'memories' dentro do seu schema
            $table->foreign('memory_id')
                ->references('id')
                ->on("{$this->schema}.memories") // Aponta para 'memories.memories'
                ->onDelete('cascade');
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

