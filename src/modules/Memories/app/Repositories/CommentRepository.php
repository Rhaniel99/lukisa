<?php

namespace Modules\Memories\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Memories\Interfaces\Repositories\ICommentRepository;
use Modules\Memories\Models\Comment;

class CommentRepository extends CoreRepository implements ICommentRepository
{
    /**
     * @var Comment
     */
    protected $model;

    public function __construct(Comment $model)
    {
        parent::__construct($model);
    }

    // Adicione aqui métodos específicos para o CommentRepository...
}