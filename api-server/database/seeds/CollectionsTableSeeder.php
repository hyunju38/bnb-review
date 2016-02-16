<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CollectionsTableSeeder extends Seeder
{
    /**
     *  Run the database seeds.
     *
     *  @return void
     *
     */
    public function run()
    {
        factory('App\Api\V1\Models\Collection', 50)->create();
    }
}
