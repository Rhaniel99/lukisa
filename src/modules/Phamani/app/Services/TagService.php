<?php

namespace Modules\Phamani\Services;

use Illuminate\Support\Facades\Auth;
use Modules\Phamani\Interfaces\Repositories\ITagRepository;
use Modules\Phamani\Interfaces\Services\ITagService;

class TagService implements ITagService
{
    public function __construct(protected ITagRepository $repository) {}

    public function resolveTagIds(array $tags): array
    {
        $names = collect($tags)
            ->map(function ($tag) {
                if (is_array($tag)) {
                    return $tag['name'] ?? null;
                }

                if (is_object($tag) && property_exists($tag, 'name')) {
                    return $tag->name;
                }

                return null;
            })
            ->filter()
            ->map(fn($t) => mb_strtolower(trim($t)))
            ->unique()
            ->values()
            ->all();

        return $this->repository->getOrCreateIdsForUser(Auth::id(), $names);
    }

    public function syncTransactionTags($transaction, array $tags): void
    {
        $tagIds = $this->resolveTagIds($tags);

        if ($tagIds) {
            $transaction->tags()->sync($tagIds);
        } else {
            $transaction->tags()->detach();
        }
    }
}
