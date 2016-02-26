<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Product::class, function ($faker) {
    return [
        'name' => $faker->word,
        'desc' => $faker->text
    ];
});

$factory->define(App\Review::class, function ($faker) {
    return [
        'comment' => $faker->text,
        'score' => $faker->numberBetween(1, 5),
        'product_id' => App\Product::all()->random()->id
    ];
});
