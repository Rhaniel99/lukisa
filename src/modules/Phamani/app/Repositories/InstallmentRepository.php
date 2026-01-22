<?php

namespace Modules\Phamani\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Phamani\Interfaces\Repositories\IInstallmentRepository;
use Modules\Phamani\Models\Installment;

class InstallmentRepository extends CoreRepository implements IInstallmentRepository
{
    /**
     * @var Installment
     */
    protected $model;

    public function __construct(Installment $model)
    {
        parent::__construct($model);
    }

    // Adicione aqui métodos específicos para o InstallmentRepository...
}