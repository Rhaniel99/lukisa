<?php

namespace Modules\Marvin\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Marvin\Interfaces\Repositories\IChatRepository;
use Modules\Marvin\Models\ChatMessage;

class ChatRepository extends CoreRepository implements IChatRepository
{
    /**
     * @var ChatMessage
     */
    protected $model;

    public function __construct(ChatMessage $model)
    {
        parent::__construct($model);
    }

    // Adicione aqui métodos específicos para o ChatRepository...
}