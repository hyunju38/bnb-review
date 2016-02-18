<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Models\Product;
use App\Api\V1\Transformers\ProductTransformer;

use Illuminate\Http\Request;

class ProductsController extends ApiController
{
    public function show()
    {
        $products = Product::all();
        return $this->response->collection($products, new ProductTransformer);
    }

    public function store(Request $request)
    {
        $product = new Product;

        $product->_id = Product::max('_id') + 1;
        $product->name = $request['name'];
        $product->desc = $request['desc'];
        $product->reviews = $request['reviews'];    // string -> int

        $product->save();

        return [
            'status' => 201,
            'messages' => 'POST request success'
        ];
    }

    // public function update(Request $request, $id)
    // {
    //     $product = Product::find(intval($id));
    //     $product->name = $request['name'];
    //     $product->desc = $request['desc'];
    //     $product->reviews = $this->_reviewsTransformer($request['reviews']);    // string -> int
    //     $product->save();
    //
    //     return [
    //         'status' => 202,
    //         'messages' => 'PUT request success',
    //         'updatedData' => $product
    //     ];
    // }
    //
    // public function destroy(Request $request, $id)
    // {
    //     $product = Product::find(intval($id));
    //     $product->delete();
    //
    //     return [
    //         'status' => 203,
    //         'messages' => 'DELETE success'
    //     ];
    // }
    //
    // private function _reviewsTransformer(array $reviews)
    // {
    //     $transformedReviews = [];
    //     foreach ($reviews as $reviewId) {
    //         array_push($transformedReviews, intVal($reviewId));
    //     }
    //     return $transformedReviews;
    // }
}
