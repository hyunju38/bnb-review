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
        factory(App\Product::class, 10)->create();
        
        factory(App\Review::class, 30)->create();

        // $product = App\Product::all()->random();

        // $product->reviews()->save($review);

        // $faker = Faker\Factory::create();
        // for ($i = 0; $i < 10; $i++) {
        //     $product = new App\Product;
        //     $product->name = $faker->word;
        //     $product->desc = $faker->paragraph;
        //     $product->save();
        //
        //     $reviewCount = rand(0, 3);
        //     while ($reviewCount > 0) {
        //         $review = new App\Review;
        //         $review->comment = $faker->sentence;
        //         $review->score = $faker->numberBetween(1, 5);
        //         $review->product = $product;
        //         $product->reviews()->save($review);
        //
        //         $review->save();
        //         $reviewCount--;
        //     }
        // }

        // factory(App\Product::class, 10)->create();
            // ->each(function ($product) {

                // $product->reviews()
                //     ->save(factory(App\Review::class)->create());

                // $reviewCount = rand(0, 3);
                // while ($reviewCount > 0) {
                // $reviews = factory(App\Review::class, 3)->create();
                // $product->reviews()->save($reviews);
                //     $reviewCount--;
                // }
                    // ->each(function ($review) use ($product) {
                    //     $product->reviews()
                    //         ->save($review);
                    // });

                // for ($i = 1; $i < 3; $i++) {
                //     $product->reviews()
                //         ->save(factory(App\Review::class)->create());
                // }

                // factory(App\Review::class, 3)->create()
                //     ->each(function ($review) use ($product) {
                //         $product->reviews()->save($review);
                //     });

                // $reviews = factory(App\Review::class, 3)->create();
                // $reviews->get(0);
                // $review->comment = 'test test';
                // $review->score = 3;
                // $review->product_id = $product->id;

                // $product->reviews()->save($reviews->get(0));

                // $review = factory(App\Review::class)->create();
                // $review = new App\Review;
                // $review->comment = 'test test';
                // $review->score = 3;
                // $review->product_id = $product->id;

                // $product->reviews()->save($reviews->get(1));
            // });
        // factory(App\Product::class, 10)->create();

        // // It generates 0 ~ 3 review data with a product data
        // factory(App\Product::class, 10)->create()
        //     ->each(function ($product) {
        //         factory(App\Review::class, rand(0, 3))->create()
        //             ->each(function ($review) use ($product) {
        //                 $product->reviews()
        //                     ->save($review);
        //             });
        //     });
    }
}
