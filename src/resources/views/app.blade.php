<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Lukisa') }}</title>
        <!-- Scripts -->
        @routes
        @viteReactRefresh
            @vite(['resources/js/app.tsx', 'resources/css/app.css', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
