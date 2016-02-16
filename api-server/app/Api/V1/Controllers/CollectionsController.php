<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Models\Collection;
use App\Api\V1\Transformers\CollectionTransformer;

class CollectionsController extends ApiController
{
    public function show()
    {
        $collections = Collection::all();
        return $this->response->collection($collections, new CollectionTransformer);
    }
}
