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

        // odered by updated_at
        // if request parameter has a keyword, products are ordered by name and updated_at
        $keyword = $request->input('keyword');
        $paginate = empty($keyword) ?
                        Product::orderBy('updated_at', 'desc')->paginate(self::UNIT) :
                        Product::where('name', 'like', "%$keyword%")
                            ->orderBy('name', 'asc')
                            ->paginate(self::UNIT);

        // paginating product to limit element count
        $skip = intVal($request->input('page') - 1) * self::UNIT;

        $products = $paginate->items();
        // $products = Product::orderBy('updated_at', 'name')
        //                 ->skip($skip)
        //                 ->take(self::UNIT)
        //                 ->get();

        // embeding review to product
        foreach ($products as $key => $product) {
            $products[$key]->reviews = $product->reviews()->get();
        }

        // repsonse return
        return ['data' => $products, 'paginate' => $paginate];
    }
}
