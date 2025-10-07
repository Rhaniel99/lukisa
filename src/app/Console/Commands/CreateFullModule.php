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
        $this->info("Estrutura base do módulo '{$moduleName}' criada.");

        // 3. USA SEU NOVO COMANDO para criar o Service + Interface já acoplada
        Artisan::call('module:make-iservice', [
            'name' => "{$moduleName}", // O comando já adiciona o sufixo "Service"
            'module' => $moduleName
        ]);
        $this->info("Service e Interface 'I{$moduleName}Service' criados e acoplados.");

        // 4. USA SEU NOVO COMANDO para criar o Repository + Interface já acoplada
        Artisan::call('module:make-irepository', [
            'name' => "{$moduleName}", // O comando já adiciona o sufixo "Repository"
            'module' => $moduleName
        ]);
        $this->info("Repository e Interface 'I{$moduleName}Repository' criados e acoplados.");

        $this->info("---------------------------------------------------------");
        $this->info("✅ Módulo '{$moduleName}' criado com sucesso!");
        $this->warn("Lembre-se de registrar as interfaces no Service Provider:");
        $this->line("   - Arquivo: modules/{$moduleName}/app/Providers/{$moduleName}ServiceProvider.php");
        $this->line("   - Ligue I{$moduleName}Service a {$moduleName}Service.");
        $this->line("   - Ligue I{$moduleName}Repository a {$moduleName}Repository.");
        $this->info("---------------------------------------------------------");


        return parent::SUCCESS;
    }
}