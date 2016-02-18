<?php

namespace App\Api\V1\Transformers;

use League\Fractal\TransformerAbstract;

use App\Api\V1\Models\Review;

class ReviewTransformer extends TransformerAbstract
{
    public function transform(Review $reivew)
    {
        return $reivew;
    }
}
