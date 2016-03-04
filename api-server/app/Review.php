<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Review extends Eloquent
{
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
