<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Models\{Product, Review};
use App\Api\V1\Transformers\ProductTransformer;

use Illuminate\Http\Request;
use League\Fractal\TransformerAbstract;

class ProductsController extends ApiController
{
    public function show()
    {
        $products = Product::all();

        foreach ($products as $index => $product) {
            $products[$index]['reviews'] = $product->reviews;
        }

        return $this->response->collection(
            $products,
            new class extends TransformerAbstract {
                public function transform(Product $products)
                {
                    return $products;
                }
            }
        );
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

    public function _reviewTransform($reviews)
    {
        $additionalInfomationReviews = [];

        foreach ($reviews as $reviewId) {
            $review = Review::find(intval($reviewId));
            array_push($additionalInfomationReviews, $review);
        }

        return $additionalInfomationReviews;
    }

}
