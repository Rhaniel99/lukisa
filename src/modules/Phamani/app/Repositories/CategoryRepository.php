<?php

namespace Modules\Phamani\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Phamani\Interfaces\Repositories\ICategoryRepository;
use Modules\Phamani\Models\Category;

class CategoryRepository extends CoreRepository implements ICategoryRepository
{
    /**
     * @var Category
     */
    protected $model;

    public function __construct(Category $model)
    {
        parent::__construct($model);
    }

    // Adicione aqui métodos específicos para o CategoryRepository...
}