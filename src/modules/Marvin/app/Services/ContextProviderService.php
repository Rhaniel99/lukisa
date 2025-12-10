<?php

namespace Modules\Marvin\Services;

use Illuminate\Support\Facades\DB;
use Modules\Marvin\Interfaces\Services\IContextProviderService;

class ContextProviderService implements IContextProviderService
{
    public function getContext(string $intent): ?string
    {
        return match ($intent) {
            'get_user_count' => "O sistema possui exatamente " . DB::table('users')->count() . " usuários.",
            default          => null,
        };
    }
}
