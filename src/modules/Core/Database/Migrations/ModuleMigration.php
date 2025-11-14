<?php

namespace Modules\Core\Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

abstract class ModuleMigration extends Migration
{
    /**
     * Nome do schema do módulo
     */
    protected string $schema;

    public function __construct()
    {
        $this->schema = $this->resolveSchema();
        // Cria o schema se não existir
        DB::statement("CREATE SCHEMA IF NOT EXISTS {$this->schema}");
    }

    /**
     * Retorna o schema do módulo
     */
    protected function resolveSchema(): string
    {
        if (property_exists($this, 'schema') && !empty($this->schema)) {
            return $this->schema;
        }

        $moduleName = $this->getModuleNameFromNamespace();
        return config("{$moduleName}.database.schema", 'public');
    }

    /**
     * Detecta o nome do módulo pelo namespace da migration
     */
    protected function getModuleNameFromNamespace(): string
    {
        $namespace = (new \ReflectionClass($this))->getNamespaceName();
        $parts = explode('\\', $namespace);
        return strtolower($parts[1] ?? ''); // Modules\Memories\Database\Migrations -> memories
    }

    /**
     * Cria tabela dentro do schema do módulo
     */
    protected function createTable(string $tableName, \Closure $callback)
    {
        DB::statement("SET search_path TO {$this->schema}");
        Schema::create($tableName, $callback);
        DB::statement("SET search_path TO public");
    }

    /**
     * Dropa tabela dentro do schema do módulo
     */
    protected function dropTable(string $tableName)
    {
        DB::statement("SET search_path TO {$this->schema}");
        Schema::dropIfExists($tableName);
        DB::statement("SET search_path TO public");
    }
}
