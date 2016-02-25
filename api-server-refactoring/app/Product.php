<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Product extends Eloquent
{
    protected $connection = 'mongodb';
    
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
