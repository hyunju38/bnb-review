<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Review extends Eloquent {
    protected $connection = 'mongodb';
}
