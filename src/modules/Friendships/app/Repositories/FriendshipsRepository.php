<?php

namespace Modules\Friendships\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Friendships\Interfaces\Repositories\IFriendshipsRepository;
use Modules\Friendships\Models\Friendship;

class FriendshipsRepository extends CoreRepository implements IFriendshipsRepository
{
    public function __construct(Friendship $model)
    {
        parent::__construct($model);
    }
    
}