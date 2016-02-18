<?php

$api = app('Dingo\Api\Routing\Router');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$api->group([
    'version' => 'v1',
    'namespace' => 'App\Api\V1\Controllers',
    'middleware' => 'cors',
], function() use ($api)
{
    // $api->get('collections/{collection}', [
    //     'uses' => 'CollectionsController@show'
    // ]);

    $api->get('products', [
        'uses' => 'ProductsController@show'
    ]);

    // $api->post('products', [
    //     'uses' => 'ProductsController@store'
    // ]);
    //
    // $api->put('products/{id}', [
    //     'uses' => 'ProductsController@update'
    // ]);
    //
    // $api->delete('products/{id}', [
    //     'uses' => 'ProductsController@destroy'
    // ]);


    $api->get('reviews', [
        'uses' => 'ReviewsController@show'
    ]);

    $api->post('reviews', [
        'uses' => 'ReviewsController@store'
    ]);

    $api->put('reviews/{id}', [
        'uses' => 'ReviewsController@update'
    ]);

    $api->delete('reviews/{id}', [
        'uses' => 'ReviewsController@destroy'
    ]);

    // $api->get('test', function () {
    //     $client = new MongoDB\Client('mongodb://localhost:27017');
    //     $collection = $client->pensionreview->products;
    //
    //     $cursor = $collection->find();
    //     $result = '';
    //     foreach ($cursor as $document) {
    //         $result .= $document['name'];
    //     }
    //     return $result;
    // });
});
