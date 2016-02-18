<?php

namespace App\Api\V1\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

// class Collection extends Model
class Product extends Eloquent
{
    protected $connection = 'mongodb';

    // /**
    //  *  Indicates if the model should be timestamped.
    //  *
    //  *  @var bool
    //  */
    // public $timestamps = false;
    //
    // /**
    //  *  Indicates if the model should force an auto-incrementing id.
    //  *
    //  *  @var bool
    //  */
    // public $incrementing = true;
}
