<?php

namespace App\Console\Commands;

use Artisan;
use Illuminate\Console\Command;

class CreateFullModule extends Command
{
    /**
     * O nome e a assinatura do comando.
     * {name : O nome do módulo a ser criado (ex: Auth, Video)}
     */
    protected $signature = 'module:makefull {name}';

    /**
     * A descrição do comando.
     */
    protected $description = 'Cria um novo módulo com todas as camadas de arquitetura (Service, Repository, etc).';

    /**
     * Executa a lógica do comando.
     */
    public function handle()
    {
        $moduleName = $this->argument('name');
        $this->info("Iniciando a criação do módulo completo: {$moduleName}");

        // 1. Cria a estrutura base do módulo
        Artisan::call('module:make', ['name' => [$moduleName]]);

        // 2. Cria os componentes internos
        $modelName = $moduleName; // Por convenção, o model tem o mesmo nome do módulo
        Artisan::call('module:make-model', ['model' => $modelName, 'module' => $moduleName]);
        Artisan::call('module:make-service', ['name' => "{$moduleName}Service", 'module' => $moduleName]);
        Artisan::call('module:make-repository', ['name' => "{$moduleName}Repository", 'module' => $moduleName]);

        // Para a interface, especificamos o caminho completo para ela ir para a pasta certa
        Artisan::call('module:make-interface', [
            'name' => "Repositories/I{$moduleName}Repository",
            'module' => $moduleName
        ]);

        Artisan::call('module:make-interface', [
            'name' => "Services/I{$moduleName}Service",
            'module' => $moduleName
        ]);

        $this->info("✅ Módulo '{$moduleName}' criado com sucesso com todas as camadas!");

        return parent::SUCCESS;
    }
}
