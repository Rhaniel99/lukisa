<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Artisan;

class IRepositoryMakeCommand extends Command
{
    /**
     * O nome e a assinatura do console command.
     *
     * @var string
     */
    protected $signature = 'module:make-irepository {name} {module}';

    /**
     * A descrição do console command.
     *
     * @var string
     */
    protected $description = 'Cria uma classe de repositório (estendendo CoreRepository) e sua interface (estendendo ICoreRepository) para um módulo.';

    /**
     * Execute o console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('name');
        $module = $this->argument('module');

        if (!Str::endsWith($name, 'Repository')) {
            $name .= 'Repository';
        }

        $interfaceName = 'I' . $name;

        // =================================================================
        // PASSO 1: Cria e Modifica a INTERFACE
        // =================================================================
        Artisan::call('module:make-interface', [
            'name' => "Repositories/{$interfaceName}",
            'module' => $module
        ]);

        $interfacePath = module_path($module, "app/Interfaces/Repositories/{$interfaceName}.php");
        $interfaceNamespace = "Modules\\{$module}\\Interfaces\\Repositories";
        
        $interfaceContent = <<<PHP
                <?php

                namespace $interfaceNamespace;

                use App\Interfaces\Repositories\ICoreRepository;

                interface $interfaceName extends ICoreRepository
                {
                    // Adicione aqui as assinaturas de métodos específicos para o {$name}...
                }
                PHP;
                
        file_put_contents($interfacePath, $interfaceContent);
        $this->info("Interface criada e modificada: {$interfacePath}");


        // =================================================================
        // PASSO 2: Cria e Modifica o REPOSITORY
        // =================================================================
        Artisan::call('module:make-repository', [
            'name' => $name,
            'module' => $module
        ]);

        $filePath = module_path($module, "app/Repositories/{$name}.php");
        $modelName = str_replace('Repository', '', $name);
        $classNamespace = "Modules\\{$module}\\Repositories";
        $modelNamespace = "Modules\\{$module}\\Models\\{$modelName}";

        $repositoryContent = <<<PHP
<?php

namespace $classNamespace;

use App\Repositories\Base\CoreRepository;
use $interfaceNamespace\\$interfaceName;
use $modelNamespace;

class $name extends CoreRepository implements $interfaceName
{
    /**
     * @var {$modelName}
     */
    protected \$model;

    public function __construct({$modelName} \$model)
    {
        parent::__construct(\$model);
    }

    // Adicione aqui métodos específicos para o {$name}...
}
PHP;
        file_put_contents($filePath, $repositoryContent);
        $this->info("Classe de repositório criada e modificada: {$filePath}");

        return parent::SUCCESS;
    }
}