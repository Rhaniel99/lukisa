<?php

namespace Modules\Phamani\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Modules\Phamani\Enums\Category\Color;
use Modules\Phamani\Enums\Category\Icon;
use Modules\Phamani\Enums\RecurringFrequency;
use Modules\Phamani\Interfaces\Repositories\IAccountRepository;
use Modules\Phamani\Interfaces\Repositories\ICategoryRepository;
use Modules\Phamani\Interfaces\Repositories\IInstallmentRepository;
use Modules\Phamani\Interfaces\Repositories\IRecurringTransactionRepository;
use Modules\Phamani\Interfaces\Repositories\ITransactionRepository;
use Modules\Phamani\Interfaces\Services\IAccountService;
use Modules\Phamani\Interfaces\Services\ICategoryService;
use Modules\Phamani\Interfaces\Services\IDashboardService;
use Modules\Phamani\Interfaces\Services\IInstallmentService;
use Modules\Phamani\Interfaces\Services\IRecurringTransactionService;
use Modules\Phamani\Interfaces\Services\ITransactionService;
use Modules\Phamani\Repositories\AccountRepository;
use Modules\Phamani\Repositories\CategoryRepository;
use Modules\Phamani\Repositories\InstallmentRepository;
use Modules\Phamani\Repositories\RecurringTransactionRepository;
use Modules\Phamani\Repositories\TransactionRepository;
use Modules\Phamani\Services\AccountService;
use Modules\Phamani\Services\CategoryService;
use Modules\Phamani\Services\DashboardService;
use Modules\Phamani\Services\InstallmentService;
use Modules\Phamani\Services\RecurringTransactionService;
use Modules\Phamani\Services\TransactionService;
use Nwidart\Modules\Traits\PathNamespace;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class PhamaniServiceProvider extends ServiceProvider
{
    use PathNamespace;

    protected string $name = 'Phamani';

    protected string $nameLower = 'phamani';

    /**
     * Boot the application events.
     */
    public function boot(): void
    {
        $this->registerCommands();
        $this->registerCommandSchedules();
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->loadMigrationsFrom(module_path($this->name, 'database/migrations'));
        $this->shareEnums();
    }

    /**
     * Register the service provider.
     */
    public function register(): void
    {

        $this->app->register(EventServiceProvider::class);
        $this->app->register(RouteServiceProvider::class);

        // * SERVICES
        $this->app->bind(
            ITransactionService::class,
            TransactionService::class
        );

        $this->app->bind(
            IAccountService::class,
            AccountService::class
        );

        $this->app->bind(
            ICategoryService::class,
            CategoryService::class
        );

        $this->app->bind(
            IDashboardService::class,
            DashboardService::class
        );

        $this->app->bind(
            IInstallmentService::class,
            InstallmentService::class
        );

        $this->app->bind(
            IRecurringTransactionService::class,
            RecurringTransactionService::class
        );

        // ? REPOSITORY 
        $this->app->bind(
            ITransactionRepository::class,
            TransactionRepository::class
        );

        $this->app->bind(
            IAccountRepository::class,
            AccountRepository::class
        );

        $this->app->bind(
            ICategoryRepository::class,
            CategoryRepository::class
        );

        $this->app->bind(
            IInstallmentRepository::class,
            InstallmentRepository::class
        );

        $this->app->bind(
            IRecurringTransactionRepository::class,
            RecurringTransactionRepository::class
        );
    }

    /**
     * Register commands in the format of Command::class
     */
    protected function registerCommands(): void
    {
        // $this->commands([]);
    }

    /**
     * Register command Schedules.
     */
    protected function registerCommandSchedules(): void
    {
        // $this->app->booted(function () {
        //     $schedule = $this->app->make(Schedule::class);
        //     $schedule->command('inspire')->hourly();
        // });
    }

    /**
     * Register translations.
     */
    public function registerTranslations(): void
    {
        $langPath = resource_path('lang/modules/' . $this->nameLower);

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, $this->nameLower);
            $this->loadJsonTranslationsFrom($langPath);
        } else {
            $this->loadTranslationsFrom(module_path($this->name, 'lang'), $this->nameLower);
            $this->loadJsonTranslationsFrom(module_path($this->name, 'lang'));
        }
    }

    /**
     * Register config.
     */
    protected function registerConfig(): void
    {
        $configPath = module_path($this->name, config('modules.paths.generator.config.path'));

        if (is_dir($configPath)) {
            $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($configPath));

            foreach ($iterator as $file) {
                if ($file->isFile() && $file->getExtension() === 'php') {
                    $config = str_replace($configPath . DIRECTORY_SEPARATOR, '', $file->getPathname());
                    $config_key = str_replace([DIRECTORY_SEPARATOR, '.php'], ['.', ''], $config);
                    $segments = explode('.', $this->nameLower . '.' . $config_key);

                    // Remove duplicated adjacent segments
                    $normalized = [];
                    foreach ($segments as $segment) {
                        if (end($normalized) !== $segment) {
                            $normalized[] = $segment;
                        }
                    }

                    $key = ($config === 'config.php') ? $this->nameLower : implode('.', $normalized);

                    $this->publishes([$file->getPathname() => config_path($config)], 'config');
                    $this->merge_config_from($file->getPathname(), $key);
                }
            }
        }
    }

    /**
     * Merge config from the given path recursively.
     */
    protected function merge_config_from(string $path, string $key): void
    {
        $existing = config($key, []);
        $module_config = require $path;

        config([$key => array_replace_recursive($existing, $module_config)]);
    }

    /**
     * Register views.
     */
    public function registerViews(): void
    {
        $viewPath = resource_path('views/modules/' . $this->nameLower);
        $sourcePath = module_path($this->name, 'resources/views');

        $this->publishes([$sourcePath => $viewPath], ['views', $this->nameLower . '-module-views']);

        $this->loadViewsFrom(array_merge($this->getPublishableViewPaths(), [$sourcePath]), $this->nameLower);

        Blade::componentNamespace(config('modules.namespace') . '\\' . $this->name . '\\View\\Components', $this->nameLower);
    }

    /**
     * Get the services provided by the provider.
     */
    public function provides(): array
    {
        return [];
    }

    private function getPublishableViewPaths(): array
    {
        $paths = [];
        foreach (config('view.paths') as $path) {
            if (is_dir($path . '/modules/' . $this->nameLower)) {
                $paths[] = $path . '/modules/' . $this->nameLower;
            }
        }

        return $paths;
    }

    private function shareEnums(): void
    {
        Inertia::share([
            'enums' => [
                'recurringFrequencies' => array_map(
                    fn(RecurringFrequency $case) => [
                        'value' => $case->value,
                        'label' => $case->label(),
                    ],
                    RecurringFrequency::cases()
                ),
                'categoryIcons' => array_map(
                    fn(Icon $case) => [
                        'value' => $case->value,
                        'label' => $case->label(),
                    ],
                    Icon::cases()
                ),
                'categoryColors' => array_map(
                    fn(Color $case) => [
                        'value' => $case->value,
                        'label' => $case->label(),
                        'hex'   => $case->hex(),
                    ],
                    Color::cases()
                ),
            ],
        ]);
    }
}
