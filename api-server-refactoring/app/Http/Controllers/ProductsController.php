<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\{Product, Review};

class ProductsController extends Controller
{
    const UNIT = 3;

    /**
     *  'GET /products' Returns products with reviews
     *
     *  @param  Illuminate\Http\Request $request
     *  @return array
     */
    public function show(Request $request)
    {
        // return Product::paginate(self::UNIT);
        $paginate = Product::paginate(self::UNIT);

        // paginating product to limit element count
        $skip = intVal($request->input('page') - 1) * self::UNIT;

        $products = Product::orderBy('updated_at', 'name')
                        ->skip($skip)
                        ->take(self::UNIT)
                        ->get();

        // embeding review to product
        foreach ($products as $key => $product) {
            $products[$key]->reviews = $product->reviews()->get();
        }

        // repsonse return
        return ['data' => $products, 'paginate' => $paginate];
    }
}
