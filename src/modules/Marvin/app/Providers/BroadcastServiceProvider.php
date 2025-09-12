<?php

namespace Modules\Marvin\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Boot any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes();

        require module_path('Marvin', 'routes/channels.php');
    }
}
