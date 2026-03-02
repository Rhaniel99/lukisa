<?php

namespace Modules\Phamani\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Phamani\Interfaces\Repositories\ITagRepository;
use Modules\Phamani\Models\Tag;

class TagRepository extends CoreRepository implements ITagRepository
{
    /**
     * @var Tag
     */
    protected $model;

    public function __construct(Tag $model)
    {
        parent::__construct($model);
    }

    public function getOrCreateIdsForUser(string|int $userId, array $names): array
    {
        $names = collect($names)
            ->filter(fn($t) => is_string($t) && trim($t) !== '')
            ->map(fn($t) => trim($t))
            ->unique()
            ->values();

        if ($names->isEmpty()) return [];

        // Busca existentes
        $existing = $this->model->newQuery()
            ->where('user_id', $userId)
            ->whereIn('name', $names)
            ->get()
            ->keyBy('name');

        $ids = [];

        foreach ($names as $name) {
            $tag = $existing->get($name);

            if (!$tag) {
                $tag = $this->model->newQuery()->create([
                    'user_id' => $userId,
                    'name'    => $name,
                    'color'   => null,
                ]);
            }

            $ids[] = $tag->id;
        }

        return $ids;
    }
}
