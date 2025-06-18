<?php

namespace Modules\Authentication\Interfaces\Repositories;

use App\Models\User;

interface IAuthenticationRepository {
    public function create(array $data): User;

}
