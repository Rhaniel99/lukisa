<?php

namespace Modules\Phamani\Models;

use App\Models\BaseModel;

abstract class ModuleBaseModel extends BaseModel
{
    /**
     * Nome da tabela SEM schema
     * Ex: transactions, accounts, categories
     */
    protected string $tableName;

    /**
     * Config onde o schema do módulo está definido
     */
    protected string $schemaConfigKey = 'phamani.database.schema';

    public function getTable(): string
    {
        $schema = config($this->schemaConfigKey);

        return $schema
            ? "{$schema}.{$this->tableName}"
            : $this->tableName;
    }
}
