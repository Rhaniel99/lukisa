<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File; // Importe a Facade de Arquivos
use Illuminate\Support\Str;

class ModuleMakeDataCommand extends Command
{
    /**
     * A assinatura do nosso novo comando.
     */
    protected $signature = 'module:make-dto {name} {module}';

    /**
     * A descrição do comando.
     */
    protected $description = 'Cria um novo Data Transfer Object (DTO) da Spatie dentro de um módulo específico.';

    /**
     * Executa a lógica do comando.
     */
    public function handle(): int
    {
        $moduleName = Str::studly($this->argument('module'));
        $dtoName = Str::studly($this->argument('name'));

        // 1. Define o caminho completo de destino para o novo arquivo DTO
        $destinationPath = module_path($moduleName, "app/DTOs/{$dtoName}.php");

        // 2. Garante que o diretório de destino exista
        File::ensureDirectoryExists(dirname($destinationPath));

        // 3. Verifica se o arquivo já existe para não sobrescrever
        if (File::exists($destinationPath)) {
            $this->error("O DTO {$dtoName} já existe no módulo {$moduleName}!");
            return parent::FAILURE;
        }

        // 4. Define o namespace completo para a nova classe
        $namespace = "Modules\\{$moduleName}\\DTOs";

        // 5. Lê o conteúdo do nosso molde (stub)
        $stubContent = File::get(base_path('stubs/data.stub'));

        // 6. Substitui os placeholders pelos nossos valores
        $fileContent = str_replace(
            ['{{ namespace }}', '{{ class }}'],
            [$namespace, $dtoName],
            $stubContent
        );

        // 7. Salva o novo arquivo no local correto
        File::put($destinationPath, $fileContent);

        $this->info("✅ DTO '{$dtoName}' criado com sucesso em: {$destinationPath}");

        return parent::SUCCESS;
    }
}
