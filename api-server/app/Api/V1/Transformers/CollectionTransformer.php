<?php

namespace App\Api\V1\Transformers;

use League\Fractal\TransformerAbstract;
use App\Api\V1\Models\Collection;

class CollectionTransformer extends TransformerAbstract
{
    public function transform(Collection $collection)
    {
        // return $collection;
        return [
            'id' => $collection->id,
            'type' => $collection->type,
            'attributes' => [
                'page_id' => $collection->page_id,
                'position' => (int) $collection->position
            ]
        ];
    }
}
