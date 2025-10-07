<?php

use Nwidart\Modules\Activators\FileActivator;
use Nwidart\Modules\Providers\ConsoleServiceProvider;

return [

    /*
    |--------------------------------------------------------------------------
    | Module Namespace
    |--------------------------------------------------------------------------
    |
    | Default module namespace.
    |
    */
    'namespace' => 'Modules',

    /*
    |--------------------------------------------------------------------------
    | Module Stubs
    |--------------------------------------------------------------------------
    |
    | Default module stubs.
    |
    */
    'stubs' => [
        'enabled' => true,
        'path' => base_path('stubs/modules'),
        // 'path' => base_path('vendor/nwidart/laravel-modules/src/Commands/stubs'),
        'files' => [
            'routes/web' => 'routes/web.php',
            'routes/api' => 'routes/api.php',
            // 'views/index' => 'resources/views/index.blade.php',
            // 'views/master' => 'resources/views/components/layouts/master.blade.php',
            'scaffold/config' => 'config/config.php',
            'composer' => 'composer.json',
            // 'assets/js/app' => 'resources/assets/js/app.js',
            // 'assets/sass/app' => 'resources/assets/sass/app.scss',
            // 'vite' => 'vite.config.js',
            // 'package' => 'package.json',
        ],
        'replacements' => [
            /**
             * Define custom replacements for each section.
             * You can specify a closure for dynamic values.
             *
             * Example:
             *
             * 'composer' => [
             *      'CUSTOM_KEY' => fn (\Nwidart\Modules\Generators\ModuleGenerator $generator) => $generator->getModule()->getLowerName() . '-module',
             *      'CUSTOM_KEY2' => fn () => 'custom text',
             *      'LOWER_NAME',
             *      'STUDLY_NAME',
             *      // ...
             * ],
             *
             * Note: Keys should be in UPPERCASE.
             */
            'routes/web' => ['LOWER_NAME', 'STUDLY_NAME', 'PLURAL_LOWER_NAME', 'KEBAB_NAME', 'MODULE_NAMESPACE', 'CONTROLLER_NAMESPACE'],
            'routes/api' => ['LOWER_NAME', 'STUDLY_NAME', 'PLURAL_LOWER_NAME', 'KEBAB_NAME', 'MODULE_NAMESPACE', 'CONTROLLER_NAMESPACE'],
            'vite' => ['LOWER_NAME', 'STUDLY_NAME', 'KEBAB_NAME'],
            'json' => ['LOWER_NAME', 'STUDLY_NAME', 'KEBAB_NAME', 'MODULE_NAMESPACE', 'PROVIDER_NAMESPACE'],
            'views/index' => ['LOWER_NAME'],
            'views/master' => ['LOWER_NAME', 'STUDLY_NAME', 'KEBAB_NAME'],
            'scaffold/config' => ['STUDLY_NAME'],
            'composer' => [
                'LOWER_NAME',
                'STUDLY_NAME',
                'VENDOR',
                'AUTHOR_NAME',
                'AUTHOR_EMAIL',
                'MODULE_NAMESPACE',
                'PROVIDER_NAMESPACE',
                'APP_FOLDER_NAME',
            ],
        ],
        'gitkeep' => true,
    ],
    'paths' => [
        /*
        |--------------------------------------------------------------------------
        | Caminho dos Módulos
        |--------------------------------------------------------------------------
        | Onde os módulos serão salvos.
        */
        'modules' => base_path('modules'),

        /*
        |--------------------------------------------------------------------------
        | Caminho dos Assets dos Módulos
        |--------------------------------------------------------------------------
        | Onde os assets publicados dos módulos ficarão.
        */
        'assets' => public_path('modules'),

        /*
        |--------------------------------------------------------------------------
        | Caminho das Migrations
        |--------------------------------------------------------------------------
        | Para onde as migrations são publicadas.
        */
        'migration' => base_path('database/migrations'),

        /*
        |--------------------------------------------------------------------------
        | Nome da pasta da aplicação
        |--------------------------------------------------------------------------
        | O nome da pasta principal da lógica do módulo, geralmente 'app'.
        */
        'app_folder' => 'app',

        /*
        |--------------------------------------------------------------------------
        | Caminhos do Gerador (Generator)
        |--------------------------------------------------------------------------
        | Defina os caminhos para a geração de arquivos.
        | 'generate' => false desabilita a criação da pasta na geração do módulo.
        */
        'generator' => [
            // Estrutura principal do 'app'
            'actions' => ['path' => 'app/Actions', 'generate' => true],
            'casts' => ['path' => 'app/Casts', 'generate' => true],
            'channels' => ['path' => 'app/Broadcasting', 'generate' => true],
            'command' => ['path' => 'app/Console/Commands', 'generate' => true],
            'component-class' => ['path' => 'app/View/Components', 'generate' => true],
            'dtos' => ['path' => 'app/DTOs', 'generate' => true],
            'emails' => ['path' => 'app/Mail', 'generate' => true],
            'enums' => ['path' => 'app/Enums', 'generate' => true],
            'event' => ['path' => 'app/Events', 'generate' => true],
            'exceptions' => ['path' => 'app/Exceptions', 'generate' => true],
            'jobs' => ['path' => 'app/Jobs', 'generate' => true],
            'helpers' => ['path' => 'app/Helpers', 'generate' => false], // Geralmente Helpers são globais
            'interfaces' => ['path' => 'app/Interfaces', 'generate' => true],
            'listener' => ['path' => 'app/Listeners', 'generate' => true],
            'model' => ['path' => 'app/Models', 'generate' => true],
            'notifications' => ['path' => 'app/Notifications', 'generate' => true],
            'observer' => ['path' => 'app/Observers', 'generate' => true],
            'policies' => ['path' => 'app/Policies', 'generate' => true],
            'provider' => ['path' => 'app/Providers', 'generate' => true],
            'repository' => ['path' => 'app/Repositories', 'generate' => true],
            'rules' => ['path' => 'app/Rules', 'generate' => true],
            'scopes' => ['path' => 'app/Models/Scopes', 'generate' => true],
            'services' => ['path' => 'app/Services', 'generate' => true],
            'support' => ['path' => 'app/Support', 'generate' => true],
            'traits' => ['path' => 'app/Traits', 'generate' => true],

            // Estrutura de 'app/Http'
            'controller' => ['path' => 'app/Http/Controllers', 'generate' => true],
            'middleware' => ['path' => 'app/Http/Middleware', 'generate' => true],
            'request' => ['path' => 'app/Http/Requests', 'generate' => true],
            'resource' => ['path' => 'app/Http/Resources', 'generate' => true],

            // Estrutura de 'config'
            'config' => ['path' => 'config', 'generate' => true],

            // Estrutura de 'database'
            'factory' => ['path' => 'database/factories', 'generate' => true],
            'migration' => ['path' => 'database/migrations', 'generate' => true],
            'seeder' => ['path' => 'database/seeders', 'generate' => true],

            // Estrutura de 'resources' (essencial para Inertia)
            'assets' => ['path' => 'resources/assets', 'generate' => false], // Obsoleto, use 'js'/'css'
            'js' => ['path' => 'resources/js', 'generate' => true],
            'css' => ['path' => 'resources/css', 'generate' => false],
            'page' => ['path' => 'resources/js/Pages', 'generate' => true], // Para páginas Inertia
            'component-view' => ['path' => 'resources/views/components', 'generate' => false],
            'views' => ['path' => 'resources/views', 'generate' => true],

            // Estrutura de 'routes'
            'routes' => ['path' => 'routes', 'generate' => true],
            'route-provider' => ['path' => 'app/Providers', 'generate' => true],

            // Estrutura de 'lang' e 'tests'
            'lang' => ['path' => 'lang', 'generate' => false],
            'test-feature' => ['path' => 'tests/Feature', 'generate' => true],
            'test-unit' => ['path' => 'tests/Unit', 'generate' => true],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Auto Discover of Modules
    |--------------------------------------------------------------------------
    |
    | Here you configure auto discover of module
    | This is useful for simplify module providers.
    |
    */
    'auto-discover' => [
        /*
        |--------------------------------------------------------------------------
        | Migrations
        |--------------------------------------------------------------------------
        |
        | This option for register migration automatically.
        |
        */
        'migrations' => true,

        /*
        |--------------------------------------------------------------------------
        | Translations
        |--------------------------------------------------------------------------
        |
        | This option for register lang file automatically.
        |
        */
        'translations' => false,

    ],

    /*
    |--------------------------------------------------------------------------
    | Package commands
    |--------------------------------------------------------------------------
    |
    | Here you can define which commands will be visible and used in your
    | application. You can add your own commands to merge section.
    |
    */
    'commands' => ConsoleServiceProvider::defaultCommands()
        ->merge([
            // New commands go here
        ])->toArray(),

    /*
    |--------------------------------------------------------------------------
    | Scan Path
    |--------------------------------------------------------------------------
    |
    | Here you define which folder will be scanned. By default will scan vendor
    | directory. This is useful if you host the package in packagist website.
    |
    */
    'scan' => [
        'enabled' => false,
        'paths' => [
            base_path('vendor/*/*'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Composer File Template
    |--------------------------------------------------------------------------
    |
    | Here is the config for the composer.json file, generated by this package
    |
    */
    'composer' => [
        'vendor' => env('MODULE_VENDOR', 'nwidart'),
        'author' => [
            'name' => env('MODULE_AUTHOR_NAME', 'Nicolas Widart'),
            'email' => env('MODULE_AUTHOR_EMAIL', 'n.widart@gmail.com'),
        ],
        'composer-output' => false,
    ],

    /*
    |--------------------------------------------------------------------------
    | Choose what laravel-modules will register as custom namespaces.
    | Setting one to false will require you to register that part
    | in your own Service Provider class.
    |--------------------------------------------------------------------------
    */
    'register' => [
        'translations' => true,
        /**
         * load files on boot or register method
         */
        'files' => 'register',
    ],

    /*
    |--------------------------------------------------------------------------
    | Activators
    |--------------------------------------------------------------------------
    |
    | You can define new types of activators here, file, database, etc. The only
    | required parameter is 'class'.
    | The file activator will store the activation status in storage/installed_modules
    */
    'activators' => [
        'file' => [
            'class' => FileActivator::class,
            'statuses-file' => base_path('modules_statuses.json'),
        ],
    ],

    'activator' => 'file',
];
