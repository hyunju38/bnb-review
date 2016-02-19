<?php

namespace App\Api\V1\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Review extends Eloquent {
    protected $connection = 'mongodb';

    public function product()
    {
        return $this->belongsTo('App\Api\V1\Models\Product');
    }
}
