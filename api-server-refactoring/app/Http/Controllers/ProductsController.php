<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\{Product, Review};

class ProductsController extends Controller
{
    const UNIT = 1;

    /**
     *  'GET /products' Returns products with reviews
     *
     *  @param  Illuminate\Http\Request $request
     *  @return array
     */
    public function show(Request $request)
    {
        // paginating product to limit element count
        $skip = intVal($request->input('page')) * self::UNIT;

        $products = Product::orderBy('updated_at', 'name')
                        ->skip($skip)
                        ->take(self::UNIT)
                        ->get();

        // embeding review to product
        foreach ($products as $key => $product) {
            $products[$key]->reviews = $product->reviews()->get();
        }

        // repsonse return
        return $products;
    }
}
