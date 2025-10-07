<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Artisan;

class IRepositoryMakeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'module:make-irepository {name} {module}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new repository class and its interface for a module.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('name');
        $module = $this->argument('module');
        
        // Garante que o nome do repositório termine com "Repository"
        if (!Str::endsWith($name, 'Repository')) {
            $name .= 'Repository';
        }

        $interfaceName = 'I' . $name;

        // 1. Cria a interface na pasta correta
        Artisan::call('module:make-interface', [
            'name' => "Repositories/{$interfaceName}",
            'module' => $module
        ]);
        $this->info("Interface created: app/Interfaces/Repositories/{$interfaceName}.php");

        // 2. Cria o repository (usando o gerador padrão)
        Artisan::call('module:make-repository', [
            'name' => $name,
            'module' => $module
        ]);

        // 3. Sobrescreve o conteúdo do repository para garantir a implementação
        $filePath = module_path($module, "app/Repositories/{$name}.php");

        $classNamespace = "Modules\\{$module}\\Repositories";
        $useStatement = "use Modules\\{$module}\\Interfaces\\Repositories\\{$interfaceName};";

        $content = <<<PHP
            <?php

            namespace $classNamespace;

            $useStatement

            class $name implements $interfaceName
            {
                //
            }
            PHP;

        file_put_contents($filePath, $content);
        $this->info("Repository class created and fixed: app/Repositories/{$name}.php");

        return parent::SUCCESS;
    }
}
