<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Product::class, 50)->create()
            ->each(function($product) {
                $product->reviews()
                    ->save(factory(App\Review::class)->make());
            });
    }
}
