<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Artisan;

class IServiceMakeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'module:make-iservice {name} {module}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service class and its interface for a module.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('name');
        $module = $this->argument('module');
        
        // Garante que o nome do serviço termine com "Service"
        if (!Str::endsWith($name, 'Service')) {
            $name .= 'Service';
        }

        $interfaceName = 'I' . $name;

        // 1. Cria a interface na pasta correta
        Artisan::call('module:make-interface', [
            'name' => "Services/{$interfaceName}",
            'module' => $module
        ]);
        $this->info("Interface created: app/Interfaces/Services/{$interfaceName}.php");

        // 2. Cria o service (usando o gerador padrão)
        Artisan::call('module:make-service', [
            'name' => $name,
            'module' => $module
        ]);

        // 3. Sobrescreve o conteúdo do service para garantir a implementação
        $filePath = module_path($module, "app/Services/{$name}.php");

        $classNamespace = "Modules\\{$module}\\Services";
        $useStatement = "use Modules\\{$module}\\Interfaces\\Services\\{$interfaceName};";

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
        $this->info("Service class created and fixed: app/Services/{$name}.php");

        return parent::SUCCESS;
    }
}
