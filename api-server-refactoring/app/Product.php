<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Product extends Eloquent
{
    public function reviews()
    {
        // return $this->hasMany(Review::class);
        return $this->embedsMany(Review::class);
    }
}
